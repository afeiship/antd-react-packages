import React, { Component } from 'react';
import { Form, FormProps, FormInstance } from 'antd';
import cx from 'classnames';
import noop from '@jswork/noop';
import compose from 'p-pipe';
import { AntdFormBuilderProps } from './antd-form-builder';
import FormBuilder from 'antd-form-builder';
import { generateHelpers, getComputedMeta, toValue } from './helpers';

const CLASS_NAME = 'antd-form-schema';

type StdEventTarget = { target: { value: any } };
type StdFormTarget = { target: { value: FormInstance } };
type StdCallback = (inEvent: StdEventTarget) => void;
type StdFormCallback = (inEvent: StdFormTarget) => void;

type AntdFormProps = FormProps & Omit<AntdFormBuilderProps, 'form'>;
type AntdFormSchemaProps = {
  className?: string;
  caption?: React.ReactNode;
  children?: React.ReactNode;
  onInit?: StdFormCallback;
  onFinish?: StdCallback;
  pipes?: Promise<any>[] | any[];
} & AntdFormProps;

type AntdSchemaState = {
  meta: any;
};

export default class AntdFormSchema extends Component<
  AntdFormSchemaProps,
  AntdSchemaState
> {
  static displayName = CLASS_NAME;
  static defaultProps = {
    onInit: noop,
    onFinish: noop,
    pipes: []
  };

  private formRef = React.createRef<FormInstance>();

  state = {
    meta: getComputedMeta(this.props.presets!, this.props.meta)
  };

  componentDidMount() {
    const { onInit } = this.props;
    const form = this.formRef.current!;
    onInit!({ target: { value: form } });
    this.handleInitValues();
  }

  handleValuesChange = () => {
    const { pipes } = this.props;
    if (!pipes?.length) return;
    const form = this.formRef.current;
    const meta = this.state.meta;
    const helpers = generateHelpers(meta);
    compose(...pipes)({ meta, form, ...helpers }).then((res: any) => {
      this.setState({ meta: res.meta });
    });
  };

  handleFinish = (inEvent) => {
    const { onFinish } = this.props;
    onFinish!({ target: { value: inEvent } });
  };

  handleInitValues = () => {
    const { meta } = this.props;
    const form = this.formRef.current!;
    const initValues = meta.initialValues;
    const isFromAsync = Array.isArray(initValues);
    if (isFromAsync) {
      const [api, transform] = initValues;
      const _transform = transform || toValue;
      api.then((res) => {
        form.setFieldsValue(_transform(res));
      });
    } else {
      form.setFieldsValue(initValues);
    }
  };

  render() {
    const {
      className,
      meta,
      presets,
      pipes,
      caption,
      children,
      onInit,
      onFinish,
      ...props
    } = this.props;

    const _meta = this.state.meta;

    return (
      <Form
        ref={this.formRef}
        className={cx(className, CLASS_NAME)}
        onValuesChange={this.handleValuesChange}
        onFinish={this.handleFinish}
        {...props}>
        {caption}
        <FormBuilder meta={_meta} form={this.formRef.current!} />
        {children}
      </Form>
    );
  }
}
