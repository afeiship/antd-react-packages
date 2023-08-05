import React, { Component, ReactNode } from 'react';
import ReactAntConfirm from '@jswork/react-ant-confirm';
import { Button, message, Space, Tag, Card } from 'antd';
import { PlusOutlined, ReloadOutlined, UnorderedListOutlined } from '@ant-design/icons';
import locals from './locals';

// next packages
import '@jswork/next';
import '@jswork/next-qs';
import '@jswork/next-get2get';
import '@jswork/next-url-operator';
import '@jswork/next-kebab-case';

const CLASS_NAME = 'react-ant-abstract';

export type ReactAntAbstractProps = {
  /**
   * The extended className for component.
   */
  className?: string;
  lang?: string;
};

export default class ReactAntAbstract extends Component<ReactAntAbstractProps, any> {
  static displayName = CLASS_NAME;
  static version = '__VERSION__';

  static defaultProps = {};
  protected apiService;
  protected routeService;
  protected eventService;
  protected refreshEvent;

  lang = 'zh-CN';
  resources = 'users';
  size = 'small';
  module = 'modules';
  action = 'index';
  rowKey = 'id';
  current: any = { item: null, index: -1 };

  t = (inKey) => {
    const { lang } = this;
    return nx.get(locals, `${lang}.${inKey}`, inKey);
  };

  get actions() {
    return {
      title: this.t('actions'),
      width: 90,
      render: (_text: string, _record: any) => {
        return (
          <Space>
            <a onClick={this.edit}>{this.t('edit')}</a>
            <ReactAntConfirm onClick={this.del}>{this.t('delete')}</ReactAntConfirm>
          </Space>
        );
      }
    };
  }

  get titleView() {
    return (
      <Space>
        <UnorderedListOutlined />
        <span>{this.t('title')}</span>
        <Tag>{this.resources}</Tag>
      </Space>
    );
  }

  get extraView() {
    return (
      <Space>
        <Button size={'small'} onClick={this.forceRefresh}>
          <ReloadOutlined />
          <span>{this.t('refresh')}</span>
        </Button>
        <Button size={'small'} onClick={this.add}>
          <PlusOutlined />
          <span>{this.t('add')}</span>
        </Button>
      </Space>
    );
  }

  get params() {
    return nx.get2get(this.props, ['match.params', 'params']);
  }

  get qs() {
    const pathname = location.hash.slice(1);
    if (!pathname) return {};
    const [_, search] = pathname.split('?');
    return nx.qs(search);
  }

  get id() {
    return nx.get(this.current, `item.${this.rowKey}`);
  }

  get options(): any {
    return null;
  }

  constructor(inProps) {
    super(inProps);
    this.state = nx.mix(null, this.initialState(), {
      loading: false,
      data: []
    });
    this.init();
  }

  /**
   * @template
   *
   */
  initialState() {
    return null;
  }

  /**
   * @template
   * Set wrap response.
   */
  dataDidLoad(inResponse) {
    return inResponse;
  }

  /**
   * @template
   * Set init after constructor.
   */
  init() {}

  /**
   * @template
   *  Set refresh method.
   */
  forceRefresh = () => {
    // 与 refresh 不同之处在于，重置并 refresh
    this.load();
  };

  /**
   * @template
   * Set refresh method.
   */
  refresh = () => {
    this.load();
  };

  load = () => {};

  componentDidMount() {
    this.attachEvents();
    setTimeout(() => {
      nx.set(this.routeService, 'current', this.props);
    }, 0);
  }

  componentWillUnmount() {
    this.detachEvents();
  }

  attachEvents() {
    this.refreshEvent = this.eventService.on(`${this.resources}.${this.action}.refresh`, () => {
      this.refresh();
    });
  }

  detachEvents() {
    this.refreshEvent && this.refreshEvent.destroy();
  }

  routerPrefix() {
    const module = nx.kebabCase(this.module);
    const resources = nx.kebabCase(this.resources);
    return `${module}/${resources}`;
  }

  route = (inModule, inAction?: boolean) => {
    const prefix = this.routerPrefix();
    const url = `/${prefix}/${inModule}`;
    const action = inAction ? 'replace' : 'push';
    this.routeService[action](url);
  };

  add = () => {
    this.route('add');
  };

  edit = (inEvent) => {
    inEvent.stopPropagation();
    if (this.id) this.route(`edit/${this.id}`);
  };

  del = (inEvent) => {
    inEvent.stopPropagation();
    const data = nx.mix(null, this.current.item);
    this.apiService[`${this.resources}_destroy`](data).then(() => this.refresh());
  };

  /**
   * SubClass will call this method.
   * @param inItem
   */
  update = (inItem) => {
    const data = { id: this.id, ...inItem };
    this.apiService[`${this.resources}_update`](data).then(() =>
      message.success(this.t('success'))
    );
  };

  view(inProps?): ReactNode {
    console.warn('Must implement: ', inProps);
    return null;
  }

  render() {
    const { loading } = this.state;
    return (
      <Card loading={loading} title={this.titleView} extra={this.extraView} className={CLASS_NAME}>
        {this.view()}
      </Card>
    );
  }
}
