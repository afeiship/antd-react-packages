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
      isComposite: false,
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
    const { items, isComposite } = this.state;
    const triggerKeys = ['Tab', 'Enter', 'Space'];
    const val = value.trim();
    const idx = items.length - 1;
    if (isComposite) return false;
    if (code === 'Backspace') return this.handleTagRemove(idx);
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

  handleCompositionStart = (inEvent) => {
    this.setState({
      isComposite: true
    });
  };

  handleCompositionEnd = (inEvent) => {
    this.setState({
      isComposite: false
    });
  };

  handleMouseEnter = (inEvent) => {
    this.inputRef.current?.focus();
  };

  render() {
    const { className, ...props } = this.props;
    const { items, inputValue } = this.state;

    return (
      <div className={cx(CLASS_NAME, className)} onMouseEnter={this.handleMouseEnter} {...props}>
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
          autoFocus
          ref={this.inputRef}
          onCompositionStart={this.handleCompositionStart}
          onCompositionEnd={this.handleCompositionEnd}
          onInput={this.handleInputChange}
          onKeyDown={this.handleInputKeyAction}
          value={inputValue}
          className={cx(`${CLASS_NAME}__input`, className)}
        />
      </div>
    );
  }
}
