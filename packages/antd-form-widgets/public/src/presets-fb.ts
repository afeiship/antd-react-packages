import FormBuilder from '@jswork/antd-form-builder/src/components/form-builder';

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

export const meta_without_presets = [
  { key: 'login', label: 'LOGIN as' },
  { key: 'username', label: 'Username' },
  {
    key: 'c1',
    label: 'checkable-dropdown',
    widget: 'ac:checkable-dropdown'
  },
  {
    key: 'avatar',
    label: 'Avater',
    widget: 'ac:upload-picture',
    widgetProps: {
      action: 'http://localhost:3200/weibo_api/interface/pic_upload.php'
    }
  },
  {
    key: 'photos',
    label: 'Photos',
    widget: 'ac:upload-picture-card',
    widgetProps: {
      action: 'http://localhost:3200/weibo_api/interface/pic_upload.php'
    }
  },
  {
    key: 'c4',
    label: 'tag-list',
    widget: 'ac:checkable-tag-list'
  }
] as any;
