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

const CLASS_NAME = 'ac-upload-picture-card';
const styleOpts = { id: 'viewer-style' };
const scriptOpts = { id: 'viewerjs' };
const styleURL = 'https://unpkg.com/viewerjs@1.11.1/dist/viewer.min.css';
const scriptURL = 'https://unpkg.com/viewerjs@1.11.1/dist/viewer.min.js';

type StdEventTarget = { target: { value: any } };
type StdCallback = (inEvent: StdEventTarget) => void;

type Props = {
  className?: string;
  value?: any[];
  onChange?: StdCallback;
} & DraggerProps;

type State = {
  fileList: UploadFile[];
};

export class AcUploadPictureCard extends React.Component<Props, State> {
  static displayName = CLASS_NAME;
  static defaultProps = {
    onChange: noop
  };

  private rootRef = React.createRef<HTMLDivElement>();
  private sortable: any = null;
  private viewer: any = null;

  state = {
    fileList: this.props.value || []
  };

  async componentDidMount() {
    const { rootRef } = this;
    const root = rootRef.current as HTMLDivElement;
    const el = root.querySelector('.ant-upload-list');
    this.mountSortable(el);
    await this.mountViewer(el);
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
    const { onChange } = this.props;
    this.setState({ fileList: inValue }, () => {
      onChange!({ target: { value: inValue.map((item) => item.response) } });
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
    return (
      <div className={cx(CLASS_NAME, className)} ref={this.rootRef}>
        <Upload
          className={cx(`${CLASS_NAME}__uploader`, className)}
          defaultFileList={value}
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
