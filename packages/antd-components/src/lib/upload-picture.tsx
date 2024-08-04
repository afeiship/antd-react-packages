import React from 'react';
import noop from '@jswork/noop';
import { UploadOutlined } from '@ant-design/icons';
import { Upload, Button } from 'antd';
import cx from 'classnames';
import { AcAbstractUpload } from './_abstract-upload';
import nx from '@jswork/next';

const CLASS_NAME = 'ac-upload-picture';

export class AcUploadPicture extends AcAbstractUpload {
  static displayName = CLASS_NAME;
  static formSchema = CLASS_NAME;
  static defaultProps = {
    onChange: noop,
    value: [],
    maxCount: 1,
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
          accept="images/*"
          name="pic1"
          listType="picture"
          multiple={false}
          onChange={this.handleChange}
          onPreview={this.handlePreview}
          previewFile={this.previewFile}
          fileList={fileList}
          {...props}>
          <Button icon={<UploadOutlined />}>上传({fileList.length})</Button>
        </Upload>
      </div>
    );
  }
}
