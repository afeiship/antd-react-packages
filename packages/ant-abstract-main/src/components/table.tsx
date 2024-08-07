import React from 'react';
import { Table, Button, Space, Tag, Popconfirm } from 'antd';
import { PlusOutlined, ReloadOutlined, UnorderedListOutlined } from '@ant-design/icons';
import ReactAntInputSearch from '@jswork/react-ant-input-search';
import deepEqual from 'deep-equal';
import debounce from 'debounce';
import Abstract from './abstract';

// next packages
import '@jswork/next';
import '@jswork/next-qs';
import '@jswork/next-get2get';
import '@jswork/next-url-operator';
import '@jswork/next-kebab-case';

const CLASS_NAME = 'react-ant-abstract-curd';

export class ReactAntCurdTable extends Abstract {
  static displayName = CLASS_NAME;
  static version = '__VERSION__';

  static defaultProps = {};
  private lastQs;
  private urlOperator = new nx.UrlOperator({ type: 'hash' });

  bordered = true;
  skipLoad = false;
  action = 'index';
  searchable = false;
  pagination = {
    // current page number
    page: 'page',
    // per page size
    size: 'size',
    // total count
    total: 'total'
  };

  get keywords() {
    const { keywords } = this.qs;
    return keywords || '';
  }

  set keywords(inValue) {
    const target = { keywords: inValue };
    location.href = this.urlOperator.update(target);
    this.setState(target);
  }

  get page() {
    const { page } = this.qs;
    return page || 1;
  }

  set page(inValue) {
    location.href = this.urlOperator.update({ page: inValue });
  }

  get pageSize() {
    const { size } = this.qs;
    return size || 10;
  }

  set pageSize(inValue) {
    location.href = this.urlOperator.update({ size: inValue });
  }

  get id() {
    return nx.get(this.current, `item.${this.rowKey}`);
  }

  get fields(): any[] {
    return [];
  }

  get actions() {
    return {
      title: this.t('actions'),
      width: 100,
      render: (_text: string, _record: any) => {
        return (
          <Space>
            <a onClick={this.edit}>{this.t('edit')}</a>
            <Popconfirm title={this.t('confirm_ok')} onConfirm={this.del} onCancel={stop}>
              <a onClick={stop}>{this.t('delete')}</a>
            </Popconfirm>
          </Space>
        );
      }
    };
  }

  get columns() {
    return this.actions ? this.fields.concat(this.actions) : this.fields;
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

  get searchView() {
    if (!this.searchable) return null;
    return (
      <ReactAntInputSearch
        placeholder={`${this.t('search')} ${this.resources}`}
        allowClear
        autoFocus
        size="small"
        value={this.state.keywords}
        enterButton
        onChange={(e) => this.setState({ keywords: e.target.value })}
        onSearch={this.handleQuery}
      />
    );
  }

  get extraView() {
    const { refreshAble, createAble } = this;
    if (!refreshAble && !createAble) return null;
    return (
      <Space>
        {this.searchView}
        {refreshAble && (
          <Button size={'small'} onClick={this.forceRefresh}>
            <ReloadOutlined />
            <span>{this.t('refresh')}</span>
          </Button>
        )}
        {createAble && (
          <Button size={'small'} onClick={this.add}>
            <PlusOutlined />
            <span>{this.t('add')}</span>
          </Button>
        )}
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

  constructor(inProps) {
    super(inProps);
    const { total } = this.pagination;
    this.lastQs = this.qs;
    this.state = nx.mix(null, this.initialState(), {
      loading: false,
      columns: this.columns,
      keywords: this.keywords,
      data: [],
      [total]: 0
    });
  }

  initCache() {
    const { page, size, total } = this.pagination;
    this.state = Object.assign(this.state, {
      [page]: this.page,
      [size]: this.pageSize,
      [total]: 0
    });
  }

  componentDidMount() {
    super.componentDidMount();
    const { page } = this.pagination;
    this.initCache();
    if (!this.skipLoad) this.load({ [page]: this.state[page] });
  }

  shouldComponentUpdate() {
    if (!deepEqual(this.qs, this.lastQs)) {
      this.lastQs = this.qs;
      this.refresh();
    }

    return true;
  }

  refreshState = () => {
    const { columns } = this;
    this.setState({ columns });
  };

  refresh = () => {
    const { page, size } = this.pagination;
    this.load({
      [page]: this.state[page],
      [size]: this.pageSize
    });
  };

  forceRefresh = () => {
    this.keywords = '';
    this.handleTableChange({ current: 1, pageSize: this.pageSize });
  };

  load = debounce((inData, inAction?) => {
    const action = inAction || this.action || 'index';
    const { size } = this.pagination;
    const data = nx.mix({ [size]: this.pageSize }, this.options, inData);
    this.setState({ loading: true });
    this.apiService[`${this.resources}_${action}`](data).then((response) => {
      const { rows, total } = this.dataDidLoad(response);
      this.setState({ data: rows, total, loading: false });
    });
  });

  view(inProps?) {
    const props = inProps || {};
    const { columns, data, total, loading } = this.state;
    const { page, size } = this.pagination;

    return (
      <Table
        loading={loading}
        size={this.size}
        bordered={this.bordered}
        columns={columns}
        dataSource={data}
        onChange={this.handleTableChange}
        rowKey={this.rowKey}
        onRow={(record, index: number) => {
          const update = () => (this.current = { index, item: record });
          return { onClick: update, onMouseEnter: update };
        }}
        pagination={{
          showSizeChanger: true,
          total: total,
          pageSize: parseInt(this.state[size]),
          current: parseInt(this.state[page])
        }}
        {...props}
      />
    );
  }

  handleQuery = (inEvent) => {
    const { value } = inEvent.target;
    this.keywords = value;
    this.handleTableChange({ current: 1, pageSize: this.pageSize });
  };

  handleTableChange = (inPagination) => {
    const { current, pageSize } = inPagination;
    const { page, size } = this.pagination;
    const target = { [page]: current, [size]: pageSize };

    // cache page/size to local
    this.page = current;
    this.pageSize = pageSize;
    this.setState(target, () => {
      this.load(target);
    });
  };
}
