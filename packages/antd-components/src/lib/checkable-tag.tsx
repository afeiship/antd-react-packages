import React from 'react';
import noop from '@jswork/noop';
import { Tag } from 'antd';
import cx from 'classnames';
import { CheckableTagProps } from 'antd/es/tag';
import { CloseOutlined } from '@ant-design/icons';

const CLASS_NAME = 'ac-checkable-tag';
const { CheckableTag } = Tag;
type StdEventTarget = { target: { value: any } };
type StdCallback = (inEvent: StdEventTarget) => void;

/**
 * @see https://ant.design/components/tag-cn/#Tag.CheckableTag
 */

type Props = {
  className?: string;
  value?: boolean;
  closable?: boolean;
  onChange?: StdCallback;
  onCloseClick?: StdCallback;
} & Omit<CheckableTagProps, 'checked'>;

export class AcCheckableTag extends React.Component<Props> {
  static displayName = CLASS_NAME;
  static defaultProps = {
    value: false,
    closable: false,
    onChange: noop,
    onCloseClick: noop
  };

  state = {
    value: Boolean(this.props.value)
  };

  shouldComponentUpdate(nextProps: Readonly<Props>): boolean {
    const { value } = nextProps;
    if (value !== this.state.value) {
      this.setState({ value });
    }
    return true;
  }

  handleChange = (inEvent) => {
    const { onChange } = this.props;
    const target = { value: inEvent };
    this.setState(target, () => {
      onChange!({ target });
    });
  };

  handleCloseClick = (inEvent) => {
    const { onCloseClick } = this.props;
    inEvent.stopPropagation();
    onCloseClick!(inEvent);
  };

  render() {
    const {
      className,
      value,
      onChange,
      onCloseClick,
      children,
      closable,
      ...props
    } = this.props;
    const _value = this.state.value;

    return (
      <CheckableTag
        className={cx(CLASS_NAME, className)}
        onChange={this.handleChange}
        checked={_value}
        {...props}>
        {children}
        {closable && <CloseOutlined onClick={this.handleCloseClick} />}
      </CheckableTag>
    );
  }
}
