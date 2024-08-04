import React from 'react';
import noop from '@jswork/noop';
import { Rate, RateProps } from 'antd';
import cx from 'classnames';

const CLASS_NAME = 'ac-rate';
type StdEventTarget = { target: { value: any } };
type StdCallback = (inEvent: StdEventTarget) => void;

type Props = {
  className?: string;
  value?: number;
  onChange?: StdCallback;
} & RateProps;

export class AcRate extends React.Component<Props> {
  static displayName = CLASS_NAME;
  static formSchema = CLASS_NAME;
  static defaultProps = {
    onChange: noop
  };

  handleChange = (inEvent) => {
    const { onChange } = this.props;
    onChange!({ target: { value: inEvent } });
  };

  render() {
    const { className, value, onChange, ...props } = this.props;
    return (
      <Rate
        className={cx(CLASS_NAME, className)}
        onChange={this.handleChange}
        {...props}
      />
    );
  }
}
