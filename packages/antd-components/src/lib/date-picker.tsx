import React from 'react';
import noop from '@jswork/noop';
import { DatePicker, DatePickerProps } from 'antd';
import cx from 'classnames';
import moment from 'moment';

const CLASS_NAME = 'ac-date-picker';
type StdEventTarget = { target: { value: any } };
type StdCallback = (inEvent: StdEventTarget) => void;

type Props = {
  className?: string;
  value?: any;
  defaultValue?: any;
  onChange?: StdCallback;
} & DatePickerProps;

export class AcDatePicker extends React.Component<Props> {
  static displayName = CLASS_NAME;
  static defaultProps = {
    onChange: noop,
    format: 'YYYY-MM-DD HH:mm:ss'
  };

  get val() {
    const { defaultValue, format } = this.props;
    return defaultValue ? moment(defaultValue, format as string) : undefined;
  }

  handleChange = (inEvent) => {
    const { onChange, format } = this.props;
    onChange!({ target: { value: inEvent.format(format as string) } });
  };

  render() {
    const { className, defaultValue, onChange, ...props } = this.props;
    return (
      <DatePicker
        className={cx(CLASS_NAME, className)}
        onChange={this.handleChange}
        defaultValue={this.val}
        {...props}
      />
    );
  }
}
