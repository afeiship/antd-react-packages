import React from 'react';

const CLASS_NAME = 'ac-input-hidden';

export class AcInputHidden extends React.Component {
  static displayName = CLASS_NAME;
  static formSchema = CLASS_NAME;
  static defaultProps = {};

  render() {
    return <input type="hidden" {...this.props} />;
  }
}
