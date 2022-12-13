import FormBuilder from 'antd-form-builder';
import * as AcComponents from '@jswork/antd-components/src/main';

// FormBuilder.defineWidget('ac:checkable-dropdown', AcCheckableDropdown);
// FormBuilder.defineWidget('ac:checkable-tag-list', AcCheckableTagList);
// FormBuilder.defineWidget('ac:editable-tag-group', AcEditableTagGroup);
// FormBuilder.defineWidget('ac:upload-picture', AcUploadPicture);
// FormBuilder.defineWidget('ac:upload-picture-card', AcUploadPictureCard);

Object.keys(AcComponents).forEach((item) => {
  const Comp = AcComponents[item];
  if (Comp.formSchema) {
    const key = Comp.formSchema.replace('ac-', 'ac:');
    FormBuilder.defineWidget(key, Comp);
  }
});
