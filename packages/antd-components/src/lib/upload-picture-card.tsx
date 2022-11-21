import React from 'react';
import noop from '@jswork/noop';
import { Modal, Space, Upload } from 'antd';
import cx from 'classnames';
import Sortable from 'sortablejs';
import { DraggerProps } from 'antd/es/upload';
import { UploadOutlined } from '@ant-design/icons';

const CLASS_NAME = 'ac-upload-picture-card';
type StdEventTarget = { target: { value: any } };
type StdCallback = (inEvent: StdEventTarget) => void;

type Props = {
  className?: string;
  value?: any[];
  defaultValue?: any[];
  onChange?: StdCallback;
} & DraggerProps;

export class AcUploadPictureCard extends React.Component<Props> {
  static displayName = CLASS_NAME;
  static defaultProps = {
    onChange: noop
  };

  private rootRef = React.createRef<HTMLDivElement>();
  private sortable: any = null;

  state = {
    fileList: [],
    preview: false,
    previewURL: null
  };

  componentDidMount() {
    const { rootRef } = this;
    const root = rootRef.current as HTMLDivElement;
    const el = root.querySelector('.ant-upload-list');
    this.sortable = new Sortable(el, {
      animation: 150,
      draggable: '.ant-upload-list-item-container',
      ghostClass: 'sortable-ghost',
      chosenClass: 'sortable-chosen',
      dragClass: 'sortable-drag',
      onEnd: this.handleSortEnd
    });
  }

  componentWillUnmount() {
    this.sortable?.destroy();
  }

  handlePreview = (inEvent) => {
    const blobURL = URL.createObjectURL(inEvent.originFileObj);
    this.setState({ preview: true, previewURL: blobURL });
  };

  handleModalCancel = () => {
    this.setState({ preview: false });
  };

  handleChange = (inEvent) => {
    const { fileList } = inEvent;
    const done = fileList.every((file) => file.status === 'done');
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
      onChange!({ target: { value: inValue } });
    });
  };

  render() {
    const { className, value, onChange, ...props } = this.props;
    const { preview, previewURL } = this.state;
    return (
      <div className={cx(CLASS_NAME, className)} ref={this.rootRef}>
        <Upload
          action="http://localhost:3200/weibo_api/interface/pic_upload.php"
          name="pic1"
          listType="picture-card"
          className={cx(`${CLASS_NAME}__uploader`, className)}
          multiple
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          itemRender={(originNode) => {
            return originNode;
          }}
          {...props}>
          <Space direction="horizontal">
            <UploadOutlined />
            <span>上传</span>
          </Space>
        </Upload>
        <Modal
          className={cx(`${CLASS_NAME}__modal`, className)}
          footer={null}
          open={preview}
          onCancel={this.handleModalCancel}>
          {previewURL && (
            <img
              alt="preview image modal"
              className="is-img"
              src={previewURL}
            />
          )}
        </Modal>
      </div>
    );
  }
}
