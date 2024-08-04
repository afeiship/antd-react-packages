import React from 'react';
import noop from '@jswork/noop';
import { Input } from 'antd';
import cx from 'classnames';
import { TextAreaProps } from 'antd/es/input';

const CLASS_NAME = 'ac-textarea';
const TextArea = Input.TextArea;
type StdEventTarget = { target: { value: any } };
type StdCallback = (inEvent: StdEventTarget) => void;

type Props = {
  className?: string;
  value?: boolean;
  onChange?: StdCallback;
} & TextAreaProps;

export class AcTextarea extends React.Component<Props> {
  static displayName = CLASS_NAME;
  static formSchema = CLASS_NAME;
  static defaultProps = {
    onChange: noop
  };

  render() {
    const { className, defaultValue, ...props } = this.props;
    return <TextArea className={cx(CLASS_NAME, className)} {...props} />;
  }
}
