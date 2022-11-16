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
   * If use keymap `enter` key to quick add tag.
   */
  quick?: boolean;
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
    quick: false,
    onChange: noop,
    triggers: [' ', 'Enter']
  };

  static getDerivedStateFromProps(inProps, inState) {
    const { value } = inProps;
    if (value !== inState.value) {
      return { value };
    }
    return null;
  }

  private input: any;
  private btn: any;

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
    const { onChange } = this.props;
    value![inIndex] = inEvent.target.value;
    const target = { value };
    this.setState(target, () => {
      onChange!({ target });
    });
  };

  handleInputBlur = () => {
    const { value } = this.state;
    const { onChange } = this.props;
    const _value = value!.filter(Boolean).map((item) => item.trim());
    const target = { value: _.uniq(_value) };
    this.setState(target, () => {
      onChange!({ target });
    });
  };

  handleInputKeyDown = (inEvent) => {
    const { quick, triggers } = this.props;
    if (triggers?.includes(inEvent.key)) {
      !quick && inEvent.preventDefault();
      const dom = this.btn.buttonNode || this.btn;
      dom.click();
    }
  };

  handleInterChange = (inEvent) => {
    const { value } = inEvent.target;
    const { onChange } = this.props;
    const target = { value: _.uniq(value) };
    this.setState(target, () => {
      onChange!({ target });
    });
  };

  render() {
    const { className, value, onChange, min, max, quick, ...props } =
      this.props;
    const _value = this.state.value;

    return (
      <ReactInteractiveList
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
