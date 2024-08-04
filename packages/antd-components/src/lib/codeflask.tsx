import React from 'react';
import noop from '@jswork/noop';
import ReactCodeflask from '@jswork/react-codeflask';

const CLASS_NAME = 'ac-codeflask';

export class AcCodeFlask extends React.Component {
  static displayName = CLASS_NAME;
  static formSchema = CLASS_NAME;
  static defaultProps = {
    onChange: noop
  };

  render() {
    return <ReactCodeflask {...this.props} />;
  }
}
