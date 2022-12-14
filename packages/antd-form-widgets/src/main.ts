import FormBuilder from 'antd-form-builder';
import * as AcComponents from '@jswork/antd-components/src/main';

export default () => {
  Object.keys(AcComponents).forEach((item) => {
    const Comp = AcComponents[item];
    if (Comp.formSchema) {
      const key = Comp.formSchema.replace('ac-', 'ac:');
      FormBuilder.defineWidget(key, Comp);
    }
  });
};
