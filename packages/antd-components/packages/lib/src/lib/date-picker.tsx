import React from 'react';
import { DatePicker, DatePickerProps } from 'antd';
import cx from 'classnames';
import dayjs from 'dayjs';

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

const DATA_FORMAT_HOOKS = {
  date: 'YYYY-MM-DD',
  datetime: 'YYYY-MM-DD HH:mm:ss',
  time: 'HH:mm:ss',
};

export class AcDatePicker extends React.Component<Props> {
  static displayName = CLASS_NAME;
  static formSchema = CLASS_NAME;
  static defaultProps: Props = {
    format: STD_FORMAT,
  };

  get valueFormat() {
    const { format } = this.props;
    return DATA_FORMAT_HOOKS[format as 'string'] || format;
  }


  get value() {
    const { value } = this.props;
    const fmt = this.valueFormat;

    if (value == null || value === '') return null;
    if (typeof value === 'string') return dayjs(value, fmt);
    return value;
  }

  handleChange = (value: Date) => {
    const { onChange } = this.props;
    const _value = value ? dayjs(value).format(this.valueFormat) : '';
    const _event = { target: { value: _value } };
    onChange?.(_event);
  };

  render() {
    const { className, format, value, onChange, ...rest } = this.props;


    return (
      <DatePicker className={cx(CLASS_NAME, className)} value={this.value} onChange={this.handleChange} {...rest} />
    );
  }
}
