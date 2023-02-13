import React from 'react';
import noop from '@jswork/noop';
import { UploadOutlined } from '@ant-design/icons';
import { Upload, Button, UploadFile } from 'antd';
import cx from 'classnames';
import { DraggerProps } from 'antd/es/upload';
import nx from '@jswork/next';
import { loadScript, loadStyle } from '@jswork/loadkit';

const CLASS_NAME = 'ac-upload-picture';
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
  transformResponse?: (inResponse: any) => any;
} & DraggerProps;

type State = {
  fileList: any[];
};

export class AcUploadPicture extends React.Component<Props, State> {
  static displayName = CLASS_NAME;
  static formSchema = CLASS_NAME;
  static defaultProps = {
    onChange: noop,
    value: [],
    maxCount: 1,
    transformResponse: (v) => v
  };

  private rootRef = React.createRef<HTMLDivElement>();
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
    await this.mountViewer(el);
  }

  async mountViewer(el) {
    await Promise.all([loadStyle(styleURL, styleOpts), loadScript(scriptURL, scriptOpts)]);
    this.viewer = new window['Viewer'](el);
  }

  shouldComponentUpdate(nextProps: Readonly<Props>): boolean {
    const { value } = nextProps;
    if (value !== this.props.value) {
      this.setState({ fileList: this.toFileList(value as any[]) });
    }
    return true;
  }

  handleChange = (inEvent) => {
    const { onChange, transformResponse } = this.props;
    const { file, fileList } = inEvent;
    const isDone = file.status === 'done';
    this.setState({ fileList });
    if (!isDone) return;
    onChange!({ target: { value: transformResponse!(file.response) } });
  };

  handlePreview = (file: UploadFile<any>) => {
    const { fileList } = this.state;
    const idx = fileList.indexOf(file);
    this.viewer?.update();
    this.viewer.view(idx);
  };

  render() {
    const { className, value, onChange, ...props } = this.props;
    const { fileList } = this.state;

    return (
      <div className={cx(CLASS_NAME, className)} ref={this.rootRef}>
        <Upload
          accept="images/*"
          name="pic1"
          listType="picture"
          multiple={false}
          onChange={this.handleChange}
          onPreview={this.handlePreview}
          fileList={fileList}
          {...props}>
          <Button icon={<UploadOutlined />}>上传({fileList.length})</Button>
        </Upload>
      </div>
    );
  }
}
