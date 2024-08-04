import cx from 'classnames';
import React, { createRef } from 'react';
import noop from '@jswork/noop';
import AutosizeInput from 'react-input-autosize';
import { Button, Tag } from 'antd';
import deepEqual from 'fast-deep-equal';
import nx from '@jswork/next';
import _ from 'lodash';
import '@jswork/next-dom-event';
import { AcInteractiveList } from './interactive-list';

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
  static formSchema = CLASS_NAME;
  static defaultProps = {
    value: [],
    min: 0,
    max: 10,
    onChange: noop,
    triggers: [' ', 'Tab']
  };

  private inputRef = createRef<HTMLInputElement>();
  private btnRef = createRef<HTMLButtonElement>();
  private rootForwardedRef = createRef<HTMLDivElement>();
  private rootRef = createRef<any>();
  private imeStartRes;
  private imeEndRes;

  get latestInput(): HTMLInputElement {
    const root = this.rootForwardedRef.current!;
    const selector = `.${CLASS_NAME}__input input`;
    const els: NodeListOf<HTMLInputElement> = root.querySelectorAll(selector);
    return els[els.length - 1];
  }

  state = {
    value: this.props.value,
    ime: false
  };

  template = ({ item, index }, cb) => {
    // TODO: tag.cloable will create ant-tag-hidden?
    const { readOnly } = this.props;
    return (
      <Tag key={index}>
        <AutosizeInput
          ref={this.inputRef}
          type="text"
          size="small"
          value={item}
          disabled={readOnly}
          readOnly={readOnly}
          className={`${CLASS_NAME}__input`}
          onChange={this.handleInputChange.bind(this, index)}
          onBlur={this.handleInputBlur}
          onKeyDown={this.handleInputKeyDown}
        />
        {!readOnly && <i className={`${CLASS_NAME}__close`} onClick={cb}></i>}
      </Tag>
    );
  };

  templateCreate = () => {
    const { readOnly } = this.props;
    if (readOnly) return null;
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
    this.rootRef.current!.notify(value);
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
        this.actionFocusLast(100);
      }
    }, 10);
  };

  handleInputKeyDown = (inEvent) => {
    const { triggers } = this.props;
    const { ime } = this.state;
    if (triggers?.includes(inEvent.key)) {
      if (inEvent.key === ' ' && ime) return;
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

  componentDidMount() {
    const doc = document as any;
    this.imeStartRes = nx.DomEvent.on(doc, 'compositionstart', () => this.setState({ ime: true }));
    this.imeEndRes = nx.DomEvent.on(doc, 'compositionend', () => this.setState({ ime: false }));
  }

  componentWillUnmount() {
    this.imeStartRes.destroy();
    this.imeEndRes.destroy();
  }

  shouldComponentUpdate(nextProps: Readonly<Props>): boolean {
    const { value } = nextProps;
    if (!deepEqual(value, this.props.value)) {
      this.setState({ value: value!.slice() });
    }
    return true;
  }

  render() {
    const { className, value, onChange, min, max, triggers, ...props } = this.props;
    const { value: stateValue } = this.state;

    return (
      <AcInteractiveList
        className={cx(CLASS_NAME, className)}
        forwardedRef={this.rootForwardedRef}
        ref={this.rootRef}
        min={min}
        max={max}
        items={stateValue}
        template={this.template}
        templateCreate={this.templateCreate}
        templateDefault={this.templateDefault}
        onChange={this.handleInterChange}
        {...props}
      />
    );
  }
}
