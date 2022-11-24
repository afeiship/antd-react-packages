import React, { Component } from 'react';
import { Form, FormProps, FormInstance } from 'antd';
import cx from 'classnames';
import noop from '@jswork/noop';
import ppipe from 'p-pipe';
import { AntdFormBuilderProps } from './antd-form-builder';
import FormBuilder from 'antd-form-builder';
import { getComputedMeta, getHelpers } from './helpers';

const CLASS_NAME = 'antd-form-schema';

type StdEventTarget = { target: { value: any } };
type StdCallback = (inEvent: StdEventTarget) => void;

type AntdFormProps = FormProps & Omit<AntdFormBuilderProps, 'form'>;
type AntdFormSchemaProps = {
  className?: string;
  caption?: React.ReactNode;
  children?: React.ReactNode;
  onInit?: StdCallback;
  pipes?: Promise<any>[] | any[];
} & AntdFormProps;

type AntdSchemaState = {
  meta: any;
};

export default class AntdFormSchema extends Component<AntdFormSchemaProps, AntdSchemaState> {
  static displayName = CLASS_NAME;
  static defaultProps = {
    onInit: noop,
    pipes: []
  };

  private formRef = React.createRef<FormInstance>();

  state = {
    meta: getComputedMeta(this.props.presets!, this.props.meta)
  };

  componentDidMount() {
    const { onInit } = this.props;
    const value = { form: this.formRef.current };
    onInit!({ target: { value } });
  }

  handleValuesChange = () => {
    const { pipes } = this.props;
    if (!pipes?.length) return;
    const form = this.formRef.current;
    const meta = this.state.meta;
    const helpers = getHelpers(meta);
    ppipe(...pipes)({ meta, form, ...helpers }).then((res: any) => {
      this.setState({ meta: res.meta });
    });
  };

  render() {
    const { className, meta, presets, pipes, onInit, caption, children, ...props } = this.props;
    const _meta = this.state.meta;
    const opts = { ref: this.formRef, className: cx(className, CLASS_NAME), ...props };

    return (
      <Form onValuesChange={this.handleValuesChange} {...opts}>
        {caption}
        <FormBuilder meta={_meta} form={this.formRef.current!} />
        {children}
      </Form>
    );
  }
}
