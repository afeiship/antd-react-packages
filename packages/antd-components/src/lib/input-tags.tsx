import React from 'react';
import noop from '@jswork/noop';
import { Input, InputProps, Button } from 'antd';
import cx from 'classnames';

// @ https://cdpn.io/iamqamarali/fullpage/qyawoR?anon=true&view=
const CLASS_NAME = 'ac-input-tags';
type StdEventTarget = { target: { value: any } };
type StdCallback = (inEvent: StdEventTarget) => void;

type Props = {
  className?: string;
  onChange?: StdCallback;
} & InputProps;

export class AcInputTags extends React.Component<Props> {
  static displayName = CLASS_NAME;
  static formSchema = CLASS_NAME;
  static defaultProps = {
    onChange: noop
  };

  render() {
    const { className, ...props } = this.props;

    return (
      <div style={{ display: 'flex', gap: '4px', alignItems: 'center', marginBottom: 10 }}>
        <Button size="small">Tag1</Button>
        <Button size="small">Tag2</Button>
        <Button size="small">Tag3</Button>
        <Button size="small">Tag3</Button>
        <Button size="small">Tag3</Button>
        <Button size="small">Tag3</Button>
        <Button size="small">Tag3</Button>
        <Button size="small">Tag3</Button>
        <Button size="small">Tag3</Button>
        <Button size="small">Tag3</Button>
        <Button size="small">Tag3</Button>
        <Input size="small" className={cx(CLASS_NAME, className)} {...props} />
      </div>
    );
  }
}
