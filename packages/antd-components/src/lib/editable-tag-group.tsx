import cx from 'classnames';
import React from 'react';
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
    triggers: [' ', 'Enter', 'Tab']
  };

  private input: any;
  private btn: any;
  private root: any;

  get latestInput() {
    const els = document.querySelectorAll(`.${CLASS_NAME}__input input`);
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
          ref={(input) => (this.input = input)}
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

  templateCreate = (_, cb) => {
    const create = () => {
      cb();
      setTimeout(() => this.input.focus());
    };
    return (
      <Button
        ref={(btn) => (this.btn = btn)}
        size="small"
        type="dashed"
        onClick={create}
        className={`${CLASS_NAME}__create`}>
        <i className={`${CLASS_NAME}__plus`}></i>
        新增
      </Button>
    );
  };

  templateDefault = () => {
    return '';
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
        setTimeout(() => this.latestInput.focus(), 10);
      }
    }, 10);
  };

  handleInputKeyDown = (inEvent) => {
    const { triggers } = this.props;
    console.log('tab:', inEvent.key);
    if (triggers?.includes(inEvent.key)) {
      const dom = this.btn.buttonNode || this.btn;
      dom.click();
      console.log('triggered!');
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

  render() {
    const { className, value, onChange, min, max, ...props } = this.props;
    const _value = this.state.value;

    return (
      <ReactInteractiveList
        ref={(root) => (this.root = root)}
        min={min}
        max={max}
        items={_value}
        template={this.template}
        templateCreate={this.templateCreate}
        templateDefault={this.templateDefault}
        className={cx(CLASS_NAME, className)}
        onChange={this.handleInterChange}
        {...props}
      />
    );
  }
}
