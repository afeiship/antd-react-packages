import React from 'react';
import noop from '@jswork/noop';
import { DatePicker, DatePickerProps } from 'antd';
import cx from 'classnames';
import moment from 'moment';

const CLASS_NAME = 'ac-date-picker';
const STD_FORMAT = 'YYYY-MM-DD HH:mm:ss';

type StdEventTarget = { target: { value: any } };
type StdCallback = (inEvent: StdEventTarget) => void;

type Props = {
  className?: string;
  value?: string | moment.Moment;
  defaultValue?: string | moment.Moment;
  onChange?: StdCallback;
} & DatePickerProps;

export class AcDatePicker extends React.Component<Props> {
  static displayName = CLASS_NAME;
  static defaultProps = {
    onChange: noop,
    format: STD_FORMAT
  };

  handleChange = (inEvent) => {
    const { onChange } = this.props;
    onChange!({ target: { value: this.stringify(inEvent) } });
  };

  parse = (inValue) => {
    const { format } = this.props;
    return moment(inValue, format as string);
  };

  stringify = (inValue) => {
    const { format } = this.props;
    return inValue.format(format as string);
  };

  render() {
    const { className, defaultValue, value, onChange, ...props } = this.props;
    if (defaultValue) props['defaultValue'] = this.parse(defaultValue);
    if (value) props['value'] = this.parse(value);

    return (
      <DatePicker
        className={cx(CLASS_NAME, className)}
        onChange={this.handleChange}
        {...props}
      />
    );
  }
}
