import React from 'react';
import noop from '@jswork/noop';
import { Tag } from 'antd';
import cx from 'classnames';
import { CheckableTagProps } from 'antd/es/tag';

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
  onChange?: StdCallback;
} & Omit<CheckableTagProps, 'checked'>;

export class AcCheckableTag extends React.Component<Props> {
  static displayName = CLASS_NAME;
  static defaultProps = {
    onChange: noop
  };

  state = {
    value: Boolean(this.props.value)
  };

  handleChange = (inEvent) => {
    const { onChange } = this.props;
    const target = { value: inEvent };
    this.setState(target, () => {
      onChange!({ target });
    });
  };

  render() {
    const { className, value, onChange, ...props } = this.props;
    const _value = this.state.value;
    return (
      <CheckableTag
        className={cx(CLASS_NAME, className)}
        onChange={this.handleChange}
        checked={_value}
        {...props}
      />
    );
  }
}
