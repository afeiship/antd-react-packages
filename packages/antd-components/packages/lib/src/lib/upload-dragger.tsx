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
type CustomRequest = (inEvent: any) => Promise<any>;

type Props = {
  className?: string;
  value?: any[];
  defaultValue?: any[];
  onChange?: StdCallback;
  onRequest?: CustomRequest;
} & DraggerProps;

export class AcUploadDragger extends React.Component<Props> {
  static displayName = CLASS_NAME;
  static formSchema = CLASS_NAME;
  static defaultProps = {
    onChange: noop,
    onRequest: (inEvent) => Promise.resolve(inEvent)
  };

  handleChange = (inEvent) => {
    const { onChange } = this.props;
    onChange!({ target: { value: inEvent } });
  };

  handleCustomRequest = (inRequestOption) => {
    const { onRequest } = this.props;
    const { file } = inRequestOption;
    onRequest!(file)
      .then((res) => inRequestOption.onSuccess(res, file))
      .catch((err) => inRequestOption.onError(err, file));
  };

  render() {
    const { className, value, onChange, ...props } = this.props;
    return (
      <Dragger
        className={cx(CLASS_NAME, className)}
        listType="picture"
        onChange={this.handleChange}
        customRequest={this.handleCustomRequest}
        {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">单击或拖动文件到此区域以上传</p>
        <p className="ant-upload-hint">支持单个或批量上传，请不要上传公司数据或其他重要文件</p>
      </Dragger>
    );
  }
}
