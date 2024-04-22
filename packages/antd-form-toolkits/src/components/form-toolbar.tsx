import React from 'react';
import { Space, SpaceProps, Button, ButtonProps, Form, FormItemProps } from 'antd';
import cx from 'classnames';

export type FormSubmitProps = {
  className?: string;
  wrapAble?: boolean;
  resetAble?: boolean;
  backAble?: boolean;
  submitButtonProps?: ButtonProps;
  resetButtonProps?: ButtonProps;
  backButtonProps?: ButtonProps;
} & SpaceProps;

const back = () => window.history.back();
const DefaultWrapComponent = (props: FormItemProps) => (
  <Form.Item label=" " colon={false} {...props} />
);

class FormToolbar extends React.Component<FormSubmitProps, any> {
  static defaultProps = {
    wrapAble: false,
    resetAble: false,
    backAble: false,
    submitButtonProps: {
      type: 'primary',
      htmlType: 'submit',
      children: '提交'
    },
    resetButtonProps: {
      htmlType: 'reset',
      children: '重置'
    },
    backButtonProps: {
      children: '返回'
    }
  };

  get wrapComponent() {
    return this.props.wrapAble ? DefaultWrapComponent : React.Fragment;
  }

  render() {
    const {
      className,
      wrapAble,
      resetAble,
      backAble,
      submitButtonProps,
      resetButtonProps,
      backButtonProps,
      ...rest
    } = this.props;
    const WrapComponent = this.wrapComponent;
    return (
      <WrapComponent>
        <Space className={cx('ant-form-toolbar', className)} {...rest}>
          <Button {...submitButtonProps} />
          {resetAble && <Button {...resetButtonProps} />}
          {backAble && <Button onClick={back} {...backButtonProps} />}
        </Space>
      </WrapComponent>
    );
  }
}

export default FormToolbar;
