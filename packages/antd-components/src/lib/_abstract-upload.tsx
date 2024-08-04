import React, { ReactNode } from 'react';
import Sortable from 'sortablejs';
import { loadScript, loadStyle } from '@jswork/loadkit';
import { DraggerProps } from 'antd/es/upload';
import { UploadChangeParam } from 'antd/es/upload/interface';
import { UploadFile } from 'antd';
import { flushSync } from 'react-dom';

import nx from '@jswork/next';
import '@jswork/next-gpid';

const styleOpts = { id: 'viewer-style' };
const scriptOpts = { id: 'viewerjs' };
const styleURL = 'https://unpkg.com/viewerjs@1.11.1/dist/viewer.min.css';
const scriptURL = 'https://unpkg.com/viewerjs@1.11.1/dist/viewer.min.js';

type StdEventTarget = { target: { value: any } };
type StdCallback = (inEvent: StdEventTarget) => void;

type Props = {
  className?: string;
  value?: any[] | [];
  onChange?: StdCallback;
  transformResponse?: (inResponse: any) => any;
  transformURL?: (inPid) => string;
} & DraggerProps;

type State = {
  fileList: any[];
};

export class AcAbstractUpload extends React.Component<Props, State> {
  protected rootRef = React.createRef<HTMLDivElement>();
  protected sortable: any = null;
  protected viewer: any = null;

  toFileList = (inUrls: any[] | any) => {
    const { transformURL } = this.props;
    const urls = Array.isArray(inUrls) ? inUrls : [inUrls].filter(Boolean);
    return urls.map((item) => {
      if (typeof item !== 'string') return item;
      return { uid: nx.gpid(item), url: transformURL!(item) };
    });
  };

  constructor(inProps) {
    super(inProps);
    this.state = {
      fileList: this.toFileList(inProps.value)
    };
  }

  async componentDidMount() {
    const { rootRef } = this;
    const root = rootRef.current as HTMLDivElement;
    const el = root.querySelector('.ant-upload-list');
    this.mountSortable(el);
    await this.mountViewer(el);
  }

  shouldComponentUpdate(nextProps: Readonly<Props>): boolean {
    const { value } = nextProps;
    if (value !== this.props.value) {
      this.setState({ fileList: this.toFileList(value as any[]) });
    }
    return true;
  }

  mountSortable(el) {
    this.sortable = new Sortable(el, {
      animation: 150,
      draggable: '.ant-upload-list-item-container',
      ghostClass: 'sortable-ghost',
      chosenClass: 'sortable-chosen',
      dragClass: 'sortable-drag',
      onEnd: this.handleSortEnd
    });
  }

  async mountViewer(el) {
    await Promise.all([loadStyle(styleURL, styleOpts), loadScript(scriptURL, scriptOpts)]);
    this.viewer = new window['Viewer'](el);
  }

  componentWillUnmount() {
    this.sortable?.destroy();
    this.viewer?.destroy();
  }

  handlePreview = (file: UploadFile<any>) => {
    const { fileList } = this.state;
    const idx = fileList.indexOf(file);
    this.viewer?.update();
    this.viewer.view(idx);
  };

  handleChange = (inEvent: UploadChangeParam<UploadFile<any>>) => {
    const { fileList } = inEvent;
    const isDone = (file) => !file.status || file.status === 'done';
    const done = fileList.every(isDone);
    flushSync(() => this.setState({ fileList }));
    if (done) this.doChange(fileList);
  };

  handleSortEnd = (inEvent) => {
    const { oldIndex, newIndex } = inEvent;
    const { fileList } = this.state;
    const newFileList = fileList.slice();
    newFileList.splice(newIndex, 0, newFileList.splice(oldIndex, 1)[0]);
    this.doChange(newFileList);
  };

  doChange = (inValue) => {
    const { onChange, transformResponse } = this.props;
    const value = inValue.map((item) => item.response ?? item);
    onChange!({ target: { value: transformResponse!(value) } });
  };

  previewFile = (file): Promise<string> => {
    const blobURL = window.URL.createObjectURL(file);
    return new Promise((resolve) => {
      resolve(blobURL);
    });
  };

  render(): ReactNode {
    // warning: if not implement, will throw error.
    console.warn('Please implement render method.');
    return null;
  }
}
