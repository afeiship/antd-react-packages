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
  value?: string;
  defaultValue?: any[];
  onChange?: StdCallback;
} & DraggerProps;

export class AcUploadPicture extends React.Component<Props> {
  static displayName = CLASS_NAME;
  static defaultProps = {
    onChange: noop
  };

  handleTemplate = (_, inFile) => {
    const file = inFile.originFileObj;
    const blobURL = URL.createObjectURL(file);
    return <Image rootClassName="is-preview-image" src={blobURL} />;
  };

  handleChange = (inEvent) => {
    console.log('event:', inEvent);
  };

  render() {
    const { className, value, onChange, ...props } = this.props;
    return (
      <Upload
        className={cx(CLASS_NAME, className)}
        accept="images/*"
        itemRender={this.handleTemplate}
        maxCount={1}
        multiple={false}
        onChange={this.handleChange}
        {...props}>
        <Button icon={<UploadOutlined />}>上传</Button>
      </Upload>
    );
  }
}
