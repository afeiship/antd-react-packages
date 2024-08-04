import React from 'react';
import noop from '@jswork/noop';
import { Tag } from 'antd';
import cx from 'classnames';
import fde from 'fast-deep-equal';

const CLASS_NAME = 'ac-input-tags';
const TRIGGER_KEYS = ['Tab', 'Enter', 'Space'];

// @ https://cdpn.io/iamqamarali/fullpage/qyawoR?anon=true&view=
type StdEventTarget = { target: { value: any } };
type StdCallback = (inEvent: StdEventTarget) => void;

type Props = {
  className?: string;
  items?: string[];
  disabled?: boolean;
  onChange?: StdCallback;
} & React.HTMLAttributes<HTMLDivElement>;

type State = {
  items?: string[];
  inputValue: string;
  isComposite: boolean;
};

export class AcInputTags extends React.Component<Props, State> {
  static displayName = CLASS_NAME;
  static formSchema = CLASS_NAME;
  static defaultProps = {
    items: [],
    disabled: false,
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

  shouldComponentUpdate(nextProps: Readonly<Props>): boolean {
    const { items } = nextProps;
    if (!fde(items, this.props.items)) {
      this.setState({ items });
    }
    return true;
  }

  handleInputChange = (inEvent) => {
    const { value } = inEvent.target;
    this.setState({ inputValue: value });
  };

  handleInputKeyAction = (inEvent) => {
    const { code } = inEvent;
    const { value } = inEvent.target;
    const { items, isComposite } = this.state;
    const val = value.trim();
    const idx = items!.length - 1;
    inEvent.stopPropagation();

    if (isComposite) return false;
    if (code === 'Backspace') return this.handleTagRemove(idx);
    if (code === 'Tab') inEvent.preventDefault();
    if (TRIGGER_KEYS.includes(code)) {
      if (val) {
        if (!items!.includes(val)) {
          items!.push(val);
          this.setState({ inputValue: '' });
          this.execChange(items!);
        }
      }
    }
  };

  handleTagRemove = (inIndex, inForce?: boolean) => {
    const { disabled } = this.props;
    const { items, inputValue } = this.state;
    if (disabled) return;
    const newItems = items!.filter((_, idx) => idx !== inIndex);
    if (!inputValue || inForce) this.execChange(newItems);
  };

  handleMouseEnter = () => {
    this.inputRef.current?.focus();
  };

  execChange = (inItems) => {
    const { onChange } = this.props;
    this.setState({ items: (inItems || []).slice(0) }, () => {
      this.inputRef.current?.focus();
      onChange!({ target: { value: inItems } });
    });
  };

  render() {
    const { className, onChange, disabled, ...props } = this.props;
    const { items, inputValue } = this.state;

    return (
      <div
        data-disabled={disabled}
        className={cx(CLASS_NAME, className)}
        onMouseOver={this.handleMouseEnter}
        onClick={this.handleMouseEnter}
        {...props}>
        {items!.map((item, idx) => {
          return (
            <Tag
              data-disabled={disabled}
              className={`${CLASS_NAME}__tag`}
              closeIcon
              onClose={this.handleTagRemove.bind(this, idx, true)}
              key={idx}>
              {item}
            </Tag>
          );
        })}
        <input
          disabled={disabled}
          autoFocus
          ref={this.inputRef}
          onCompositionStart={() => this.setState({ isComposite: true })}
          onCompositionEnd={() => this.setState({ isComposite: false })}
          onInput={this.handleInputChange}
          onKeyDown={this.handleInputKeyAction}
          value={inputValue}
          className={cx(`${CLASS_NAME}__input`, className)}
        />
      </div>
    );
  }
}
