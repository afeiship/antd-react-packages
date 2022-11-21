import React from 'react';
import noop from '@jswork/noop';
import { Modal, Space, Upload } from 'antd';
import cx from 'classnames';
import { DraggerProps } from 'antd/es/upload';
import { UploadOutlined } from '@ant-design/icons';

const CLASS_NAME = 'ac-upload-images';
type StdEventTarget = { target: { value: any } };
type StdCallback = (inEvent: StdEventTarget) => void;

type Props = {
  className?: string;
  value?: any[];
  defaultValue?: any[];
  onChange?: StdCallback;
} & DraggerProps;

export class AcUploadImages extends React.Component<Props> {
  static displayName = CLASS_NAME;
  static defaultProps = {
    onChange: noop
  };

  state = {
    preview: false,
    previewURL: null
  };

  handlePreview = (inEvent) => {
    const blobURL = URL.createObjectURL(inEvent.originFileObj);
    this.setState({ preview: true, previewURL: blobURL });
  };

  handleModalCancel = () => {
    this.setState({ preview: false });
  };

  render() {
    const { className, value, ...props } = this.props;
    const { preview, previewURL } = this.state;
    return (
      <>
        <Upload
          action="http://localhost:3200/vapi_weibo_x_upload/interface/pic_upload.php"
          className={cx(CLASS_NAME, className)}
          listType="picture-card"
          multiple
          onPreview={this.handlePreview}
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
      </>
    );
  }
}
