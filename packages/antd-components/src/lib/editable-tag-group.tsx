import cx from 'classnames';
import React, { createRef } from 'react';
import noop from '@jswork/noop';
import ReactInteractiveList from '@jswork/react-interactive-list';
import AutosizeInput from 'react-input-autosize';
import { Button, Tag } from 'antd';
import _ from 'lodash';

const CLASS_NAME = 'ac-editable-tag-group';
type StdEventTarget = { target: { value: any } };
type StdCallback = (inEvent: StdEventTarget) => void;

type Props = {
  /**
   * The extended className for component.
   */
  className?: string;
  /**
   * Default value.
   */
  value?: any[];
  /**
   * The change handler.
   */
  onChange?: StdCallback;
  /**
   * The minimum tag number.
   */
  min?: number;
  /**
   * The maximum tags number.
   */
  max?: number;
  /**
   * If set readOnly.
   */
  readOnly?: boolean;
  /**
   * If set disabled.
   */
  disabled?: boolean;
  /**
   * Trigger key, default is `Space`.
   */
  triggers?: string[];
};

export class AcEditableTagGroup extends React.Component<Props> {
  static displayName = CLASS_NAME;
  static defaultProps = {
    value: [],
    min: 0,
    max: 20,
    onChange: noop,
    triggers: [' ', 'Tab']
  };

  private inputRef = createRef<HTMLInputElement>();
  private btnRef = createRef<HTMLElement>();
  private rootForwardedRef = createRef<HTMLDivElement>();
  private rootRef = createRef<ReactInteractiveList>();

  get latestInput(): HTMLInputElement {
    const root = this.rootForwardedRef.current!;
    const selector = `.${CLASS_NAME}__input input`;
    const els: NodeListOf<HTMLInputElement> = root.querySelectorAll(selector);
    return els[els.length - 1];
  }

  state = {
    value: this.props.value
  };

  template = ({ item, index }, cb) => {
    // TODO: tag.cloable will create ant-tag-hidden?
    const { disabled, readOnly } = this.props;
    return (
      <Tag key={index}>
        <AutosizeInput
          ref={this.inputRef}
          type="text"
          size="small"
          value={item}
          disabled={disabled}
          readOnly={readOnly}
          className={`${CLASS_NAME}__input`}
          onChange={this.handleInputChange.bind(this, index)}
          onBlur={this.handleInputBlur.bind(this, index)}
          onKeyDown={this.handleInputKeyDown}
        />
        <i className={`${CLASS_NAME}__close`} onClick={cb}></i>
      </Tag>
    );
  };

  templateCreate = () => {
    return (
      <Button
        ref={this.btnRef}
        size="small"
        type="dashed"
        onClick={this.actionCreate}
        className={`${CLASS_NAME}__create`}>
        <i className={`${CLASS_NAME}__plus`}></i>
        新增
      </Button>
    );
  };

  /**
   * Default item's value.
   */
  templateDefault = () => {
    return '';
  };

  /**
   * Add new default item.
   */
  actionCreate = () => {
    const { value } = this.state;
    value!.push(this.templateDefault());
    this.handleChange(value);
    this.rootRef.current!.notify();
    this.actionFocusLast();
  };

  /**
   * Focus latest input element if exists.
   * @param inDelay
   */
  actionFocusLast = (inDelay?: number) => {
    const delay = inDelay || 100;
    setTimeout(() => {
      this.latestInput?.focus();
    }, delay);
  };

  handleInputChange = (inIndex, inEvent) => {
    const { value } = this.state;
    value![inIndex] = inEvent.target.value;
    this.handleChange(value);
  };

  handleInputBlur = () => {
    let { value } = this.state;
    const len = value?.length;
    setTimeout(() => {
      value = _.uniq(value);
      if (document.activeElement !== this.latestInput) {
        value = value?.filter(Boolean);
      }
      this.handleChange(value);
      if (value?.length !== len) {
        this.actionFocusLast(10);
      }
    }, 10);
  };

  handleInputKeyDown = (inEvent) => {
    const { triggers } = this.props;
    if (triggers?.includes(inEvent.key)) {
      inEvent.preventDefault();
      this.actionCreate();
    }
  };

  handleInterChange = (inEvent) => {
    const { value } = inEvent.target;
    this.handleChange(value);
  };

  handleChange = (inValue, inCallback?) => {
    const callback = inCallback || noop;
    const { onChange } = this.props;
    const value = inValue.map((item) => item.trim());
    const target = { value };
    this.setState(target, () => {
      onChange!({ target });
      callback(value);
    });
  };

  shouldComponentUpdate(nextProps: Readonly<Props>): boolean {
    const { value } = nextProps;
    if (value! == this.state.value) {
      this.setState({ value });
    }
    return true;
  }

  render() {
    const { className, value, onChange, min, max, ...props } = this.props;
    const _value = this.state.value;

    return (
      <ReactInteractiveList
        className={cx(CLASS_NAME, className)}
        forwardedRef={this.rootForwardedRef}
        ref={this.rootRef}
        min={min}
        max={max}
        items={_value}
        template={this.template}
        templateCreate={this.templateCreate}
        templateDefault={this.templateDefault}
        onChange={this.handleInterChange}
        {...props}
      />
    );
  }
}
