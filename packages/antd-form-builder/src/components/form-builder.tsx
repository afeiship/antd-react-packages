import React, { Component } from 'react';
import { Form, FormProps, FormInstance } from 'antd';
import cx from 'classnames';
import noop from '@jswork/noop';
import compose from 'p-pipe';
import FormBuilder from 'antd-form-builder';
import {
  generateHelpers,
  getComputedMeta,
  initForm,
  InnerMeta,
  Presets
} from './helpers';

const CLASS_NAME = 'antd-form-builder';

type StdEventTarget = { target: { value: any } };
type StdFormTarget = { target: { value: FormInstance } };
type StdCallback = (inEvent: StdEventTarget) => void;
type StdFormCallback = (inEvent: StdFormTarget) => void;

type AntdFormBuilderProps = {
  presets?: Presets;
  meta: InnerMeta;
  className?: string;
  caption?: React.ReactNode;
  children?: React.ReactNode;
  onInit?: StdFormCallback;
  onFinish?: StdCallback;
  pipes?: Promise<any>[] | any[];
} & FormProps;

type AntdBuilderState = {
  meta: any;
};

export default class AntdFormBuilder extends Component<
  AntdFormBuilderProps,
  AntdBuilderState
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
    const { meta } = this.state;
    const form = this.formRef.current!;
    onInit!({ target: { value: form } });
    initForm(meta, form);
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
