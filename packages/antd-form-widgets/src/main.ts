import FormBuilder from 'antd-form-builder';
import {
  AcCheckableDropdown,
  AcCheckableTagList,
  AcUploadPicture,
  AcEditableTagGroup,
  AcUploadPictureCard
} from '@jswork/antd-components/src/main';

FormBuilder.defineWidget('ac:checkable-dropdown', AcCheckableDropdown);
FormBuilder.defineWidget('ac:checkable-tag-list', AcCheckableTagList);
FormBuilder.defineWidget('ac:editable-tag-group', AcEditableTagGroup);
FormBuilder.defineWidget('ac:upload-picture', AcUploadPicture);
FormBuilder.defineWidget('ac:upload-picture-card', AcUploadPictureCard);
