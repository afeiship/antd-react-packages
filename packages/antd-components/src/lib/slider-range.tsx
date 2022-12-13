import React from 'react';
import noop from '@jswork/noop';
import { Slider } from 'antd';
import cx from 'classnames';
import { SliderRangeProps } from 'antd/es/slider';

const CLASS_NAME = 'ac-slider-range';
type StdEventTarget = { target: { value: any } };
type StdCallback = (inEvent: StdEventTarget) => void;

type Props = {
  className?: string;
  range?: true;
  onChange?: StdCallback;
} & Omit<SliderRangeProps, 'range'>;

export class AcSliderRange extends React.Component<Props> {
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
    const { className, range, onChange, ...props } = this.props;
    return (
      <Slider
        range={true}
        className={cx(CLASS_NAME, className)}
        onChange={this.handleChange}
        {...props}
      />
    );
  }
}
