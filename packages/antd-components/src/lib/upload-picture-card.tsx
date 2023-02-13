import React from 'react';
import noop from '@jswork/noop';
import { Space, Upload } from 'antd';
import cx from 'classnames';
import Sortable from 'sortablejs';
import { loadScript, loadStyle } from '@jswork/loadkit';
import { DraggerProps } from 'antd/es/upload';
import { UploadOutlined } from '@ant-design/icons';
import { UploadChangeParam } from 'antd/es/upload/interface';
import { UploadFile } from 'antd';

import nx from '@jswork/next';
import '@jswork/next-gpid';

const CLASS_NAME = 'ac-upload-picture-card';
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
} & DraggerProps;

type State = {
  fileList: UploadFile[];
};

export class AcUploadPictureCard extends React.Component<Props, State> {
  static displayName = CLASS_NAME;
  static formSchema = CLASS_NAME;
  static defaultProps = {
    onChange: noop,
    value: [],
    transformResponse: (inFileList: any) => {
      return inFileList.map((item) => {
        return item.uid || item.pid || nx.gpid(item.url);
      });
    }
  };

  private rootRef = React.createRef<HTMLDivElement>();
  private sortable: any = null;
  private viewer: any = null;

  toFileList = (inUrls: any[] | any) => {
    const urls = Array.isArray(inUrls) ? inUrls : [inUrls].filter(Boolean);
    return urls.map((item) => {
      if (typeof item !== 'string') return item;
      return { uid: nx.gpid(item), url: item };
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
    this.setState({ fileList });
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
    this.setState({ fileList: inValue }, () => {
      const value = inValue.map((item) => item.response ?? item);
      onChange!({ target: { value: transformResponse!(value) } });
    });
  };

  previewFile = (file): Promise<string> => {
    const blobURL = window.URL.createObjectURL(file);
    return new Promise((resolve) => {
      resolve(blobURL);
    });
  };

  render() {
    const { className, value, onChange, ...props } = this.props;
    const { fileList } = this.state;

    return (
      <div className={cx(CLASS_NAME, className)} ref={this.rootRef}>
        <Upload
          className={cx(`${CLASS_NAME}__uploader`, className)}
          fileList={fileList}
          listType="picture-card"
          name="pic1"
          multiple
          previewFile={this.previewFile}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          {...props}>
          <Space direction="horizontal">
            <UploadOutlined />
            <span>上传</span>
          </Space>
        </Upload>
      </div>
    );
  }
}
