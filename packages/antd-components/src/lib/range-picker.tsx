import React from 'react';
import noop from '@jswork/noop';
import { DatePicker } from 'antd';
import cx from 'classnames';
import moment from 'dayjs';
import { RangePickerProps } from 'antd/es/date-picker';

const CLASS_NAME = 'ac-range-picker';
const STD_FORMAT = 'YYYY-MM-DD HH:mm:ss';
const { RangePicker } = DatePicker;

type StdEventTarget = { target: { value: any } };
type StdCallback = (inEvent: StdEventTarget) => void;

type Props = {
  className?: string;
  value?: any;
  defaultValue?: any;
  onChange?: StdCallback;
} & RangePickerProps;

export class AcRangePicker extends React.Component<Props> {
  static displayName = CLASS_NAME;
  static formSchema = CLASS_NAME;
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
    return inValue.map((item) => moment(item, format as string));
  };

  stringify = (inValue) => {
    if (!inValue) return [];
    const { format } = this.props;
    return inValue.map((item) => item.format(format as string));
  };

  render() {
    const { className, defaultValue, value, onChange, ...props } = this.props;
    if (defaultValue) props['defaultValue'] = this.parse(defaultValue);
    if (value) props['value'] = this.parse(value);

    return (
      <RangePicker
        className={cx(CLASS_NAME, className)}
        onChange={this.handleChange}
        {...props}
      />
    );
  }
}
