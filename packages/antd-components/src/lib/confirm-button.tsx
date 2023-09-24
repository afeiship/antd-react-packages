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
  lang?: string;
  title?: string;
  type?: ButtonProps['type'] | 'raw' | 'anchor';
  childProps?: ButtonProps;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

export class AcConfirmButton extends Component<AcConfirmButtonProps> {
  static displayName = CLASS_NAME;
  static formSchema = CLASS_NAME;

  static defaultProps = {
    lang: 'zh-CN',
    type: 'link',
    childProps: {}
  };

  get computedChildren() {
    const { type, children, childProps } = this.props;
    switch (type) {
      case 'raw':
        return children;
      case 'anchor':
        return <a {...childProps}>{children}</a>;
      default:
        return (
          <Button type={type} size="small" {...childProps}>
            {children}
          </Button>
        );
    }
  }

  handleCancel = () => {
    message.info(this.t('msgCancel'));
  };

  t = (inKey) => {
    const { lang } = this.props;
    return nx.get(locals, `${lang}.${inKey}`, inKey);
  };

  render() {
    const {
      className,
      onClick,
      type,
      children,
      childProps,
      lang,
      title: _title,
      ...props
    } = this.props;

    const title = _title || locals[lang!].title;

    return (
      <Popconfirm
        title={title}
        onConfirm={onClick}
        onCancel={this.handleCancel}
        className={cx(CLASS_NAME, className)}
        {...props}>
        {this.computedChildren}
      </Popconfirm>
    );
  }
}
