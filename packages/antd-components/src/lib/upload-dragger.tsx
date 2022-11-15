import React from 'react';
import noop from '@jswork/noop';
import { InboxOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import cx from 'classnames';
import { DraggerProps } from 'antd/es/upload';

const CLASS_NAME = 'ac-upload-dragger';
const { Dragger } = Upload;
type StdEventTarget = { target: { value: any } };
type StdCallback = (inEvent: StdEventTarget) => void;

type Props = {
  className?: string;
  value?: any[];
  defaultValue?: any[];
  onChange?: StdCallback;
} & DraggerProps;

export class AcUploadDragger extends React.Component<Props> {
  static displayName = CLASS_NAME;
  static defaultProps = {
    onChange: noop
  };

  handleTemplate = (node, file, fileList) => {
    console.log(node, file, fileList);
    // get index
    const index = fileList.indexOf(file);
    console.log('index: ', index);
    return (
      <div className="is-file-item">
        <div>{node}</div>
      </div>
    );
  };

  render() {
    const { className, value, ...props } = this.props;
    return (
      <Dragger
        className={cx(CLASS_NAME, className)}
        itemRender={this.handleTemplate}
        listType="picture"
        {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">单击或拖动文件到此区域以上传</p>
        <p className="ant-upload-hint">
          支持单个或批量上传，请不要上传公司数据或其他重要文件
        </p>
      </Dragger>
    );
  }
}
