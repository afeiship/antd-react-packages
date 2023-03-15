import React from 'react';
import noop from '@jswork/noop';
import { Space, Upload } from 'antd';
import cx from 'classnames';
import { UploadOutlined } from '@ant-design/icons';

import nx from '@jswork/next';
import '@jswork/next-gpid';
import { AcAbstractUpload } from './_abstract-upload';

const CLASS_NAME = 'ac-upload-picture-card';

export class AcUploadPictureCard extends AcAbstractUpload {
  static displayName = CLASS_NAME;
  static formSchema = CLASS_NAME;
  static defaultProps = {
    onChange: noop,
    value: [],
    transformURL: (pid) => (pid.includes('://') ? pid : `https://tva1.js.work/large/${pid}.jpg`),
    transformResponse: (inFileList: any) => {
      return inFileList.map((item) => {
        return item.uid || item.pid || nx.gpid(item.url);
      });
    }
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
