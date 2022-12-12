import React from 'react';
import noop from '@jswork/noop';
import { UploadOutlined } from '@ant-design/icons';
import { Upload, Button, Image } from 'antd';
import cx from 'classnames';
import { DraggerProps } from 'antd/es/upload';

const CLASS_NAME = 'ac-upload-picture';
type StdEventTarget = { target: { value: any } };
type StdCallback = (inEvent: StdEventTarget) => void;

type Props = {
  className?: string;
  value?: any[];
  defaultValue?: any[];
  onChange?: StdCallback;
} & DraggerProps;

export class AcUploadPicture extends React.Component<Props> {
  static displayName = CLASS_NAME;
  static defaultProps = {
    onChange: noop
  };

  handleTemplate = (_, file) => {
    const originalFile = file.originFileObj;
    const blobURL = URL.createObjectURL(originalFile);
    return <Image rootClassName="is-preview-image" src={blobURL} />;
  };

  render() {
    const { className, value, ...props } = this.props;
    return (
      <Upload
        className={cx(CLASS_NAME, className)}
        accept="images/*"
        itemRender={this.handleTemplate}
        maxCount={1}
        multiple={false}
        {...props}>
        <Button icon={<UploadOutlined />}>上传</Button>
      </Upload>
    );
  }
}
