import React from 'react';
import noop from '@jswork/noop';
import { DatePicker, DatePickerProps } from 'antd';
import cx from 'classnames';

const CLASS_NAME = 'ac-date-picker';
const STD_FORMAT = 'YYYY-MM-DD HH:mm:ss';

type StdEventTarget = { target: { value: any } };
type StdCallback = (inEvent: StdEventTarget) => void;

type Props = {
  className?: string;
  value?: any;
  dayjs?: any;
  defaultValue?: any;
  onChange?: StdCallback;
} & DatePickerProps;

export class AcDatePicker extends React.Component<Props> {
  static displayName = CLASS_NAME;
  static formSchema = CLASS_NAME;
  static defaultProps: Props = {
    onChange: noop,
    format: STD_FORMAT
  };

  get values() {
    const { value, defaultValue } = this.props;
    let props = {};
    if (value) props['value'] = this.parse(value);
    if (defaultValue) props['defaultValue'] = this.parse(defaultValue);
    return props;
  }

  handleChange = (inEvent) => {
    const { onChange } = this.props;
    onChange!({ target: { value: this.stringify(inEvent) } });
  };

  parse = (inValue) => {
    const { format, dayjs } = this.props;
    return dayjs(inValue, format as string);
  };

  stringify = (inValue) => {
    if (!inValue) return null;
    const { format } = this.props;
    return inValue.format(format as string);
  };

  render() {
    const { className, defaultValue, value, onChange, ...props } = this.props;
    const rest = { ...props, ...this.values };

    return (
      <DatePicker className={cx(CLASS_NAME, className)} onChange={this.handleChange} {...rest} />
    );
  }
}
