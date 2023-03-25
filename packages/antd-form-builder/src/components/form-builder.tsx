import React, { Component } from 'react';
import { Form, FormProps, FormInstance, Spin } from 'antd';
import cx from 'classnames';
import noop from '@jswork/noop';
import compose from 'p-pipe';
import FormBuilder, { FieldType } from '@jswork/antd-afb-dist';
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
type QueryInput = string | ((item: FieldType) => boolean);
type ComposeContext = {
  find: (target: QueryInput) => FieldType | undefined;
  where: (target: QueryInput) => FieldType[] | undefined;
  meta: InnerMeta;
  form: FormInstance;
};

export type AntdFormBuilderProps = {
  className?: string;
  presets?: Presets;
  meta: InnerMeta;
  pipes?: Promise<any>[] | any[];
  caption?: React.ReactNode;
  children?: React.ReactNode;
  onInit?: StdFormCallback;
  onChange?: StdCallback;
  onFinish?: StdCallback;
} & FormProps;

type AntdBuilderState = {
  meta: any;
  loading: boolean;
};

export default class AntdFormBuilder extends Component<
  AntdFormBuilderProps,
  AntdBuilderState
> {
  static displayName = CLASS_NAME;
  static defaultProps = {
    onInit: noop,
    onChange: noop,
    onFinish: noop,
    pipes: []
  };

  private formRef = React.createRef<FormInstance>();

  state = {
    loading: false,
    meta: getComputedMeta(this.props.presets!, this.props.meta)
  };

  componentDidMount() {
    const { onInit } = this.props;
    const { meta } = this.state;
    const form = this.formRef.current!;
    onInit!({ target: { value: form } });
    this.setState({ loading: true });
    initForm(meta, form).then(() => {
      this.setState({ loading: false });
    });
  }

  handleValuesChange = (inChangeValues, inValues) => {
    const { pipes, onChange } = this.props;
    const value = [inChangeValues, inValues];
    onChange!({ target: { value } });
    if (!pipes?.length) return;
    const form = this.formRef.current!;
    const meta = this.state.meta;
    const helpers = generateHelpers(meta);
    const metaCtx: ComposeContext = { ...helpers, meta, form };
    compose(...pipes)(metaCtx).then((res: any) => {
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
      presets,
      meta,
      pipes,
      caption,
      children,
      onInit,
      onValuesChange,
      onChange,
      onFinish,
      ...props
    } = this.props;

    const { loading, meta: computedMeta } = this.state;

    return (
      <Form
        ref={this.formRef}
        className={cx(className, CLASS_NAME)}
        onValuesChange={this.handleValuesChange}
        onFinish={this.handleFinish}
        {...props}>
        <Spin spinning={loading}>
          {caption}
          <FormBuilder meta={computedMeta} form={this.formRef.current!} />
          {children}
        </Spin>
      </Form>
    );
  }
}
