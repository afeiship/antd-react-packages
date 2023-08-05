import React, { Component } from 'react';
import { Tag, Form, Card, Button, message, Tooltip, Space } from 'antd';
import { FormBuilder } from '@jswork/antd-form-builder';
import nx from '@jswork/next';
import deepEqual from 'fast-deep-equal';
import type { CardSize } from 'antd/lib/card/Card';
import hotkeys from 'hotkeys-js/dist/hotkeys';
import {
  ArrowLeftOutlined,
  FormOutlined,
  SaveOutlined,
  ReloadOutlined,
  DiffOutlined
} from '@ant-design/icons';

import '@jswork/next-dom-event';
import '@jswork/next-is-empty-object';
import '@jswork/next-get2get';

const CLASS_NAME = 'ant-abstract-form';
const HOT_KEYS = 'cmd+s';
const locals = {
  'zh-CN': {
    touched: '已修改',
    edit: '编辑',
    create: '创建',
    title: '操作面板',
    refresh: '刷新',
    back: '返回',
    save: '保存',
    no_change: '数据未修改',
    success: '操作成功',
    action_on_edit: '请在编辑情况下调用此快捷操作'
  },
  'en-US': {
    touched: 'Has Touched',
    edit: 'Edit',
    create: 'Create',
    title: 'Operation Panel',
    refresh: 'Refresh',
    back: 'Back',
    save: 'Save',
    no_change: 'No Change',
    success: 'Success',
    action_on_edit: 'Please call this shortcut operation under edit'
  }
};

const OPERATION_STATUS = [
  { value: true, color: '#f50', action: 'create' },
  { value: false, color: '#87d068', action: 'edit' }
];

// By default hotkeys are not enabled for INPUT SELECT TEXTAREA elements
hotkeys.filter = nx.stubTrue;

const registerKey = (inName, inCallback) => {
  hotkeys(inName, inCallback);
  return {
    destroy: () => hotkeys.unbind(inName, inCallback)
  };
};

// https://github.com/rekit/antd-form-builder
// https://rekit.github.io/antd-form-builder/examples-v4/

export interface AntAbstractFormProps {
  location?: any;
  navigate?: any;
  params?: any;
}

interface AntAbstractFormState {
  meta: any;
  previousState?: any;
  loading?: boolean;
}

export default class AntAbstractForm extends Component<AntAbstractFormProps, AntAbstractFormState> {
  static displayName = CLASS_NAME;
  static version = '__VERSION__';
  static defaultProps = {};

  private hotkeysRes;
  private winkeyRes;

  resources = 'curds';
  size: CardSize = 'small';
  options = {};
  rawJSON = false;
  rawField = 'rawJSON';
  apiService: any;
  formRef: any;

  get lang() {
    return 'zh-CN';
  }

  actions = {
    backAble: true,
    refreshAble: false,
    redirectAble: true
  };

  constructor(inProps) {
    super(inProps);
    this.hotkeysRes = registerKey(HOT_KEYS, this.handleHotkey);
    this.state = nx.mix(
      null,
      { meta: {}, previousState: null, loading: false },
      this.initialState()
    );
    this.init();
  }

  t = (inKey) => {
    return nx.get(locals, `${this.lang}.${inKey}`, inKey);
  };

  get touchedView() {
    return (
      <Tooltip title={this.t('touched')}>
        <em style={{ color: '#f60' }}>{this.isTouched && <DiffOutlined />}</em>
      </Tooltip>
    );
  }

  get titleView() {
    const item = OPERATION_STATUS[+this.isEdit];
    const labels = { edit: this.t('edit'), create: this.t('create') };
    console.log('labels:', labels, item.action);

    return (
      <Space>
        <FormOutlined />
        <Tag style={{ margin: 0 }} color={item.color}>
          {labels[item.action]}
        </Tag>
        <Space>
          <span>{this.t('title')}</span>
          {this.touchedView}
        </Space>
      </Space>
    );
  }

  get params() {
    return nx.get2get(this.props, ['match.params', 'params']);
  }

  get isEdit() {
    return !nx.isEmptyObject(this.params);
  }

  get fieldsValue() {
    return this.formRef?.getFieldsValue(true);
  }

  set fieldsValue(inValue) {
    this.formRef?.setFieldsValue(inValue);
  }

  get isTouched() {
    const { previousState } = this.state;
    if (!this.isEdit) return this.formRef?.isFieldsTouched();
    if (!this.formRef || !previousState) return false;
    return !deepEqual(previousState, this.fieldsValue);
  }

  get extraView() {
    const { loading } = this.state;
    return (
      <Space>
        <Button
          disabled={loading}
          loading={loading}
          icon={<ReloadOutlined />}
          size={'small'}
          children={this.t('refresh')}
          onClick={this.load}
        />
        <Button icon={<ArrowLeftOutlined />} size={'small'} onClick={() => history.back()}>
          {this.t('back')}
        </Button>
      </Space>
    );
  }

  get submitView() {
    const { backAble } = this.actions;
    const { formItemLayout } = this.state.meta;
    return (
      <Form.Item wrapperCol={{ span: formItemLayout[1], offset: formItemLayout[0] }}>
        <Space>
          <Button
            disabled={!this.isTouched}
            htmlType="submit"
            type="primary"
            icon={<SaveOutlined />}
            children={this.t('save')}
          />
          {backAble && (
            <Button
              icon={<ArrowLeftOutlined />}
              onClick={() => history.back()}
              children={this.t('back')}
            />
          )}
        </Space>
      </Form.Item>
    );
  }

  /**
   * @template
   *
   */
  initialState(): any {
    return null;
  }

  /**
   * @template
   * Set init after constructor.
   */
  init() {}

  /**
   * @template
   * Get form props.
   */
  getFormProps(): any {
    return {};
  }

  componentDidMount() {
    this.winkeyRes = nx.DomEvent.on(window as any, 'keyup', this.handleWinKeyup);
    setTimeout(() => nx.set(history, 'current', this.props), 0);
    this.load();
  }

  componentWillUnmount() {
    const title = document.title;
    const hasMarked = title.includes('*');
    if (hasMarked) document.title = title.slice(0, -1);
    this.hotkeysRes.destroy();
    this.winkeyRes.destroy();
  }

  /**
   * @template
   * Transform value from api response.
   * @param inValue
   */
  dataDidLoad(inValue) {
    return this.rawJSON ? { [this.rawField]: JSON.stringify(inValue, null, 2) } : inValue;
  }

  /**
   * @template
   * Transform value before save.
   * @param inValue
   */
  dataWillSave(inValue) {
    return this.rawJSON ? JSON.parse(inValue[this.rawField]) : inValue;
  }

  load = () => {
    const { meta } = this.state;
    const data = nx.mix(null, this.params, this.options);
    this.setState({ loading: true });
    this.loader(data)
      .then((res) => {
        const response = this.dataDidLoad(res);
        nx.mix(meta.initialValues, response);
        this.fieldsValue = response;
        this.setState({ meta, previousState: response });
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  loader = (inData): Promise<any> => {
    if (!this.isEdit) return Promise.resolve();
    return this.apiService[`${this.resources}_show`](inData);
  };

  save(inEvent, inRedirect) {
    const action = this.isEdit ? 'update' : 'create';
    const shouldRefresh = this.isEdit && this.actions.refreshAble;
    const data = nx.mix(null, this.params, inEvent, this.options);
    if (!this.isTouched) return message.info(this.t('no_change'));

    return new Promise((resolve, reject) => {
      const payload = this.dataWillSave(data);
      this.apiService[`${this.resources}_${action}`](payload)
        .then((res) => {
          void message.success(this.t('success'));
          inRedirect && history.back();
          shouldRefresh && this.load();
          this.setState({ previousState: this.fieldsValue });
          resolve(res);
        })
        .catch(reject);
    });
  }

  handleWinKeyup = () => {
    const title = document.title;
    const hasMarked = title.includes('*');
    if (this.isTouched) {
      !hasMarked && (document.title = title + '*');
    } else {
      hasMarked && (document.title = title.slice(0, -1));
    }
  };

  handleHotkey = (inEvent) => {
    inEvent.preventDefault();
    if (!this.isEdit) return message.info(this.t('action_on_edit')), Promise.resolve();
    return this.save(this.fieldsValue, false);
  };

  handleFinish = (inEvent) => {
    const { value } = inEvent.target;
    const { redirectAble } = this.actions;
    return this.save(value, redirectAble);
  };

  handleInit = (inEvent) => {
    const { value } = inEvent.target;
    this.formRef = value;
  };

  formBuilder() {
    const { meta } = this.state;
    return (
      <FormBuilder
        meta={meta}
        onInit={this.handleInit}
        onChange={() => this.forceUpdate()}
        onFinish={this.handleFinish}
        {...this.getFormProps()}>
        {this.submitView}
      </FormBuilder>
    );
  }

  view() {
    const { loading } = this.state;
    const computedBusy = this.rawJSON ? false : loading;

    return (
      <Card loading={computedBusy} size={this.size} title={this.titleView} extra={this.extraView}>
        {this.formBuilder()}
      </Card>
    );
  }

  render(): React.ReactNode {
    return null;
  }
}
