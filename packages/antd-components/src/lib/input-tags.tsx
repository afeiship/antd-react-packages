import React from 'react';
import noop from '@jswork/noop';
import { Input, InputProps, Button, Tag } from 'antd';
import cx from 'classnames';

// @ https://cdpn.io/iamqamarali/fullpage/qyawoR?anon=true&view=
const CLASS_NAME = 'ac-input-tags';
type StdEventTarget = { target: { value: any } };
type StdCallback = (inEvent: StdEventTarget) => void;

type Props = {
  className?: string;
  items?: any[];
  onChange?: StdCallback;
} & InputProps;

export class AcInputTags extends React.Component<Props> {
  static displayName = CLASS_NAME;
  static formSchema = CLASS_NAME;
  static defaultProps = {
    items: [],
    onChange: noop
  };

  inputRef = React.createRef<HTMLInputElement>();

  constructor(inProps) {
    super(inProps);
    const { items } = inProps;
    this.state = {
      items,
      inputValue: ''
    };
  }

  handleInputChange = (inEvent) => {
    const { value } = inEvent.target;
    this.setState({ inputValue: value });
  };

  handleInputKeyAction = (inEvent) => {
    const { code } = inEvent;
    const { value } = inEvent.target;
    const { items } = this.state;
    const triggerKeys = ['Tab', 'Enter', 'Space'];
    const val = value.trim();
    if (code === 'Tab') inEvent.preventDefault();
    if (triggerKeys.includes(code)) {
      if (val) {
        items.push(val);
        this.setState({ items: items.slice(0), inputValue: '' });
        this.inputRef.current?.focus();
      }
    }
  };

  handleTagRemove = (inIndex) => {
    const { items } = this.state;
    const newItems = items.filter((_, idx) => idx !== inIndex);
    this.setState({ items: newItems });
  };

  render() {
    const { className, ...props } = this.props;
    const { items, inputValue } = this.state;

    return (
      <div className={cx(CLASS_NAME, className)}>
        {items.map((item, idx) => {
          return (
            <Tag
              className={`${CLASS_NAME}__tag`}
              closeIcon
              onClose={this.handleTagRemove.bind(this, idx)}
              key={idx}>
              {item}
            </Tag>
          );
        })}
        <input
          ref={this.inputRef}
          onInput={this.handleInputChange}
          onKeyDown={this.handleInputKeyAction}
          value={inputValue}
          className={cx(`${CLASS_NAME}__input`, className)}
          {...props}
        />
      </div>
    );
  }
}
