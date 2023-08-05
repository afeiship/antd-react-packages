import cx from 'classnames';
import React, { Component } from 'react';
import { Popconfirm, Button, message } from 'antd';
import type { PopconfirmProps, ButtonProps } from 'antd';

const CLASS_NAME = 'ac-confirm-button';
const locals = {
  'zh-CN': {
    title: '确认执行这个操作？',
    msgCancel: '您取消了操作~'
  },
  'en-US': {
    title: 'Are you sure to do this?',
    msgCancel: 'You canceled the operation~'
  }
};

export interface AcConfirmButtonProps extends Omit<PopconfirmProps, 'title'> {
  className?: string;
  title?: string;
  type?: ButtonProps['type'];
  locale?: keyof typeof locals;
  buttonProps?: ButtonProps;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

export class AcConfirmButton extends Component<AcConfirmButtonProps> {
  static displayName = CLASS_NAME;
  static formSchema = CLASS_NAME;

  static defaultProps = {
    locale: 'zh-CN',
    title: locals['zh-CN'].title,
    type: 'link',
    buttonProps: {}
  };

  handleCancel = () => {
    message.info(locals[this.props.locale!].msgCancel);
  };

  render() {
    const { className, onClick, type, children, buttonProps, title, ...props } = this.props;
    return (
      <Popconfirm
        title={title}
        onConfirm={onClick}
        onCancel={this.handleCancel}
        className={cx(CLASS_NAME, className)}
        {...props}>
        <Button type={type} size="small" {...buttonProps}>
          {children}
        </Button>
      </Popconfirm>
    );
  }
}
