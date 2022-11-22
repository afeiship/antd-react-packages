import React from 'react';
import noop from '@jswork/noop';
import { Slider, SliderSingleProps } from 'antd';
import cx from 'classnames';

const CLASS_NAME = 'ac-slider';
type StdEventTarget = { target: { value: any } };
type StdCallback = (inEvent: StdEventTarget) => void;

type Props = {
  className?: string;
  onChange?: StdCallback;
} & SliderSingleProps;

export class AcSlider extends React.Component<Props> {
  static displayName = CLASS_NAME;
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
      <Slider
        className={cx(CLASS_NAME, className)}
        onChange={this.handleChange}
        {...props}
      />
    );
  }
}
