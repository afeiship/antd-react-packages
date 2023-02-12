import React from 'react';
import noop from '@jswork/noop';
import { UploadOutlined } from '@ant-design/icons';
import { Upload, Button, Image } from 'antd';
import cx from 'classnames';
import { DraggerProps } from 'antd/es/upload';

const CLASS_NAME = 'ac-upload-picture';
const DEFAULT_IMG = 'https://jdc.jd.com/img/200x200';

// todo: has value initial

type StdEventTarget = { target: { value: any } };
type StdCallback = (inEvent: StdEventTarget) => void;

type Props = {
  className?: string;
  value?: string;
  onChange?: StdCallback;
} & DraggerProps;

export class AcUploadPicture extends React.Component<Props> {
  static displayName = CLASS_NAME;
  static formSchema = CLASS_NAME;
  static defaultProps = {
    onChange: noop,
    value: DEFAULT_IMG
  };

  state = {
    fileList: [] as any[]
  };

  handleTemplate = (_, inFile) => {
    const previewURL = inFile.url ?? URL.createObjectURL(inFile.originFileObj);
    return <Image rootClassName="is-preview-image" src={previewURL} />;
  };

  handleChange = (inEvent) => {
    const { onChange } = this.props;
    const { file, fileList } = inEvent;
    const isDone = file.status === 'done';
    this.setState({ fileList });
    if (!isDone) return;
    onChange!({ target: { value: file.response } });
  };

  render() {
    const { className, value, onChange, ...props } = this.props;
    const { fileList } = this.state;
    return (
      <Upload
        className={cx(CLASS_NAME, className, { 'is-empty': !fileList.length })}
        accept="images/*"
        name="pic1"
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
