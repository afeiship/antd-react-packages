import React from 'react';
import noop from '@jswork/noop';
import { Upload, Button } from 'antd';
import type { UploadProps, ButtonProps } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import cx from 'classnames';

const CLASS_NAME = 'ac-upload';
type StdEventTarget = { target: { value: any } };
type StdCallback = (inEvent: StdEventTarget) => void;
type CustomRequest = (inEvent: any) => Promise<any>;

type Props = {
  className?: string;
  value?: number;
  onChange?: StdCallback;
  onRequest?: CustomRequest;
  btnProps?: ButtonProps;
} & UploadProps;

export class AcUpload extends React.Component<Props> {
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
    const { className, value, onChange, btnProps, ...props } = this.props;
    return (
      <Upload
        className={cx(CLASS_NAME, className)}
        onChange={this.handleChange}
        customRequest={this.handleCustomRequest}
        {...props}>
        <Button icon={<UploadOutlined />} children="点击上传" {...btnProps} />
      </Upload>
    );
  }
}
