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

  state = {
    fileList: [
      {
        uid: -1,
        name: 'THE_ONLY_ONE',
        status: 'done',
        url: this.props.value
      }
    ] as any[]
  };

  handleTemplate = (_, inFile) => {
    const previewURL = inFile.url ?? URL.createObjectURL(inFile.originFileObj);
    return <Image rootClassName="is-preview-image" src={previewURL} />;
  };

  handleChange = (inEvent) => {
    const { fileList } = inEvent;
    this.setState({ fileList });
  };

  render() {
    const { className, value, onChange, ...props } = this.props;
    const { fileList } = this.state;
    return (
      <Upload
        className={cx(CLASS_NAME, className)}
        accept="images/*"
        itemRender={this.handleTemplate}
        maxCount={1}
        multiple={false}
        onChange={this.handleChange}
        fileList={fileList}
        {...props}>
        <Button icon={<UploadOutlined />}>上传</Button>
      </Upload>
    );
  }
}
