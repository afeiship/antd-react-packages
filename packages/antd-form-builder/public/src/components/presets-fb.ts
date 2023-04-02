import { FormBuilder } from '../../../src/main';

FormBuilder.defaultProps['presets'] = {
  widgets: {
    'ac:upload-picture': {
      widgetProps: {
        action: 'http://localhost:3200/weibo_api/interface/pic_upload.php'
      }
    },
    'ac:upload-picture-card': {
      widgetProps: {
        action: 'http://localhost:3200/weibo_api/interface/pic_upload.php'
      }
    }
  },
  fields: {
    avatar: {
      label: 'Avatar',
      widget: 'ac:upload-picture'
    },
    photos: {
      label: 'Photos',
      widget: 'ac:upload-picture-card'
    }
  }
};
