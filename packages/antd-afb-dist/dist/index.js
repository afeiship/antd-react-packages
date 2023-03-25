'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var memoize = _interopDefault(require('lodash/memoize'));
var isArray = _interopDefault(require('lodash/isArray'));
var has = _interopDefault(require('lodash/has'));
var find = _interopDefault(require('lodash/find'));
var pick = _interopDefault(require('lodash/pick'));
var capitalize = _interopDefault(require('lodash/capitalize'));
var antd = require('antd');
var PropTypes = _interopDefault(require('prop-types'));
require('lodash/castArray');
var _ = _interopDefault(require('lodash'));

/* eslint react/self-closing-comp: 0 */

var QuestionIcon = (function () {
  return React__default.createElement(
    "svg",
    { viewBox: "0 0 1024 1024", className: "antd-form-builder-question-icon" },
    React__default.createElement("path", { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64z m0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" }),
    React__default.createElement("path", { d: "M623.6 316.7C593.6 290.4 554 276 512 276s-81.6 14.5-111.6 40.7C369.2 344 352 380.7 352 420v7.6c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V420c0-44.1 43.1-80 96-80s96 35.9 96 80c0 31.1-22 59.6-56.1 72.7-21.2 8.1-39.2 22.3-52.1 40.9-13.1 19-19.9 41.8-19.9 64.9V620c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-22.7c0-19.7 12.4-37.7 30.9-44.8 59-22.7 97.1-74.7 97.1-132.5 0.1-39.3-17.1-76-48.3-103.3z" }),
    React__default.createElement("path", { d: "M512 732m-40 0a40 40 0 1 0 80 0 40 40 0 1 0-80 0Z" })
  );
});

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

/* eslint react/prop-types: 0 */
var FormItem = antd.Form.Item;

var isV4 = !!antd.Form.useForm;

var getValue = function getValue(obj, namePath) {
  var arr = typeof namePath === 'string' ? namePath.split('.') : namePath;
  var current = obj;

  for (var i = 0; i < arr.length; i += 1) {
    if (has(current, arr[i])) {
      current = current[arr[i]];
    } else {
      return undefined;
    }
  }

  return current;
};

var getWrappedComponentWithForwardRef = memoize(function (Comp) {
  return React.forwardRef(function (props, ref) {
    return React__default.createElement(
      'span',
      { ref: ref },
      React__default.createElement(Comp, props)
    );
  });
});

function FormBuilderField(props) {
  var field = props.field,
      meta = props.meta,
      form = props.form;


  var label = field.tooltip ? React__default.createElement(
    'span',
    null,
    field.label,
    React__default.createElement(
      antd.Tooltip,
      { title: field.tooltip },
      ' ',
      React__default.createElement(QuestionIcon, null)
    )
  ) : field.label;

  var formItemLayout = field.formItemLayout || (field.label ? getValue(meta, 'formItemLayout') || [8, 16] : null);
  if (isArray(formItemLayout) && formItemLayout.length >= 2) {
    formItemLayout = {
      labelCol: { span: formItemLayout[0] },
      wrapperCol: { span: formItemLayout[1] }
    };
  }
  var isFieldViewMode = meta.viewMode || field.viewMode || field.readOnly;
  var formItemProps = _extends({
    key: field.key,
    colon: meta.colon
  }, meta.formItemLayout !== null ? formItemLayout : {}, {
    label: label
  }, pick(field, ['help', 'extra', 'labelCol', 'wrapperCol', 'colon', 'htmlFor', 'noStyle', 'validateStatus', 'hasFeedback']), field.formItemProps, {
    className: (meta.viewMode ? 'ant-form-item-view-mode' + (isV4 ? ' ant-form-item-view-mode-v4' : '') : '') + ' ' + (field.className || field.formItemProps && field.formItemProps.className)
  });
  if (isV4) {
    if (field.key || field.name) {
      formItemProps.name = field.name || field.key.split('.');
    }
    Object.assign(formItemProps, _extends({
      noStyle: field.noFormItem || field.noStyle
    }, pick(field, ['shouldUpdate', 'dependencies'])));
  }

  if (field.label && typeof field.label === 'string') {
    formItemProps['data-label'] = field.label; // help e2e test
  }
  if (field.colSpan && formItemProps.labelCol && !field.formItemLayout) {
    var labelCol = Math.round(formItemProps.labelCol.span / field.colSpan);
    Object.assign(formItemProps, {
      labelCol: { span: labelCol },
      wrapperCol: { span: 24 - labelCol }
    });
  }

  if (field.render) {
    return field.render.call(this, _extends({
      formItemProps: formItemProps,
      field: field,
      form: form
    }, pick(props, ['disabled', 'viewMode', 'initialValues'])));
  }

  var initialValue = void 0;
  var initialValues = meta.initialValues || {};
  if (has(field, 'initialValue')) {
    initialValue = field.initialValue;
  } else if (field.getInitialValue) {
    initialValue = field.getInitialValue(field, initialValues, form);
  } else {
    initialValue = getValue(initialValues, field.name || field.key);
  }

  // Handle field props
  var rules = [].concat(toConsumableArray(field.rules || []));
  if (field.required) {
    rules.unshift({ required: true, message: field.message || field.requiredMessage || undefined });
  }
  var fieldProps = _extends({
    initialValue: initialValue,
    preserve: meta.preserve
  }, pick(field, ['getValueFromEvent', 'getValueProps', 'normalize', 'trigger', 'preserve', 'valuePropName', 'validateTrigger', 'validateFirst']), {
    rules: rules
  }, field.fieldProps);
  if (isV4) {
    Object.assign(formItemProps, fieldProps);
  }

  if (isFieldViewMode) {
    var viewEle = null;
    var formValues = form ? isV4 ? form.getFieldsValue(true) : form.getFieldsValue() : {};
    var viewValue = has(formValues, field.key || field.name.join('.')) ? getValue(formValues, formItemProps.name || field.key) : initialValue;
    if (field.renderView) {
      viewEle = field.renderView(viewValue, form, initialValues);
    } else if (field.viewWidget) {
      var ViewWidget = field.viewWidget;
      viewEle = React__default.createElement(ViewWidget, _extends({ value: viewValue, form: form, field: field }, field.viewWidgetProps));
    } else if (field.link) {
      var href = typeof field.link === 'string' ? field.link : viewValue;
      viewEle = React__default.createElement(
        'a',
        { href: href, target: field.linkTarget || '_self' },
        viewValue
      );
    } else if (field.options) {
      // a little hacky here, if a field is select/options like, auto use label for value
      var found = find(field.options, function (opt) {
        return opt[0] === viewValue;
      });
      if (found) {
        viewValue = found[1];
      }
    }
    if (!viewEle) {
      if (typeof viewValue === 'boolean') viewEle = capitalize(String(viewValue));else if (viewValue === undefined) viewEle = 'N/A';else {
        viewEle = React__default.createElement(
          'span',
          { className: 'antd-form-builder-string-content' },
          String(viewValue) || ''
        );
      }
    }

    // TODO: readOnly seems to be the same with viewMode in antd v4
    if (form && field.readOnly) {
      var _ele = React__default.createElement(
        'span',
        { className: 'antd-form-builder-read-only-content' },
        viewEle
      );
      return React__default.createElement(
        FormItem,
        formItemProps,
        isV4 ? _ele : form.getFieldDecorator(field.id || field.key, fieldProps)(_ele)
      );
    }
    delete formItemProps.name;
    delete formItemProps.key;
    return React__default.createElement(
      FormItem,
      formItemProps,
      viewEle
    );
  }

  // Handle widget props
  var wp = field.widgetProps || {};
  var widgetProps = _extends({}, pick(field, ['placeholder', 'type', 'className', 'class', 'onChange']), {
    disabled: field.disabled || meta.disabled || props.disabled
  }, wp);

  var FieldWidget = field.widget || antd.Input;

  if (field.forwardRef) {
    FieldWidget = getWrappedComponentWithForwardRef(FieldWidget);
  }
  var valueProps = {};
  var ele = React__default.createElement(
    FieldWidget,
    _extends({}, widgetProps, valueProps),
    field.children || null
  );
  var ele2 = isV4 ? ele : form.getFieldDecorator(field.id || field.key, fieldProps)(ele);

  if (isV4) {
    // antd v4 always has form item
    return React__default.createElement(
      FormItem,
      formItemProps,
      ele
    );
  }
  return field.noFormItem || field.noStyle ? ele2 : React__default.createElement(
    FormItem,
    formItemProps,
    ele2
  );
}

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css = ".ant-form-item.ant-form-item-view-mode {\n  margin-bottom: 20px;\n}\n.ant-form-item.ant-form-item-view-mode-v4 {\n  margin-bottom: 5px;\n}\n\n.ant-form-item-view-mode .ant-form-item-label {\n  text-align: left;\n  font-weight: bold;\n  line-height: 1.5;\n}\n\n.ant-form-item-view-mode .ant-form-item-control {\n  line-height: 1.5;\n}\n\n.ant-form-item-children .antd-form-builder-string-content {\n  line-height: 1.5;\n  display: inline-block;\n  padding-top: 9px;\n}\n\n.ant-form-item-view-mode .antd-form-builder-string-content {\n  display: inline;\n  padding-top: 0;\n}\n\n.antd-form-builder-question-icon {\n  fill: #40a9ff;\n  width: 16px;\n  height: 16px;\n  vertical-align: middle;\n}";
styleInject(css);

/* eslint react/no-multi-comp: 0 */

var isV4$1 = !!antd.Form.useForm;

var widgetMap = {};

function getWidget(widget) {
  if (!widget) return null;
  if (typeof widget === 'string') {
    if (!widgetMap[widget] || !widgetMap[widget].widget) {
      throw new Error('Widget \'' + widget + '\' not found, did you defined it by FormBuilder.defineComponent?');
    }
    return widgetMap[widget].widget;
  }
  return widget;
}

function normalizeMeta(meta) {
  var fields = isArray(meta) ? meta : meta.fields || meta.elements;
  if (!fields) fields = [meta];
  fields = fields.map(function (field) {
    var widget = getWidget(field.widget);
    var viewWidget = getWidget(field.viewWidget);
    var dynamic = field.dynamic !== false;
    // Find metaConvertor
    var item = find(Object.values(widgetMap), function (entry) {
      return (entry.widget === widget || entry.widget === viewWidget) && entry.metaConvertor;
    });
    if (item) {
      var newField = item.metaConvertor(field);
      if (!newField) {
        throw new Error('metaConvertor of \'' + String(field.widget) + '\' must return a field');
      }
      return _extends({}, newField, { viewWidget: viewWidget, widget: widget, dynamic: dynamic });
    }
    return _extends({}, field, { widget: widget, viewWidget: viewWidget, dynamic: dynamic });
  });
  if (isArray(meta) || !meta.fields && !meta.elements) {
    return { fields: fields };
  }
  return _extends({}, meta, {
    fields: fields
  });
}

function FormBuilder(props) {
  var getMeta = props.getMeta,
      form = props.form;

  var meta = getMeta ? getMeta(form, props) : props.meta;
  return React__default.createElement(FormBuilderInner, _extends({}, props, { form: form ? form.current || form : null, meta: meta }));
  // return (
  //   <Form.Item shouldUpdate noStyle>
  //     {() => {
  //       return <FormBuilderInner {...props} form={form ? form.current || form : null} meta={meta} />
  //     }}
  //   </Form.Item>
  // )
}

function FormBuilderInner(props) {
  var meta = props.meta,
      viewMode = props.viewMode,
      initialValues = props.initialValues,
      _props$disabled = props.disabled,
      disabled = _props$disabled === undefined ? false : _props$disabled,
      _props$form = props.form,
      form = _props$form === undefined ? null : _props$form;

  if (!meta) return null;

  var newMeta = normalizeMeta(meta);
  newMeta.viewMode = newMeta.viewMode || viewMode;
  newMeta.initialValues = newMeta.initialValues || initialValues;
  var fields = newMeta.fields,
      _newMeta$columns = newMeta.columns,
      columns = _newMeta$columns === undefined ? 1 : _newMeta$columns,
      _newMeta$gutter = newMeta.gutter,
      gutter = _newMeta$gutter === undefined ? 10 : _newMeta$gutter;

  var elements = fields.map(function (field) {
    return React__default.createElement(FormBuilderField, {
      key: field.key,
      field: field,
      disabled: disabled,
      meta: newMeta,
      form: form
    });
  });
  if (columns === 1) {
    return elements;
  }

  var rows = [];
  // for each column , how many grid cols
  var spanUnit = 24 / columns;
  // eslint-disable-next-line
  for (var i = 0; i < elements.length;) {
    var cols = [];
    for (var j = 0; (j < columns || j === 0) && // total col span is less than columns
    i < elements.length && ( // element exist
    !['left', 'both'].includes(fields[i].clear) || j === 0);) // field doesn't need to start a new row

    {
      var fieldSpan = fields[i].colSpan || 1;
      cols.push(React__default.createElement(
        antd.Col,
        { key: j, span: Math.min(24, spanUnit * fieldSpan) },
        elements[i]
      ));
      j += fieldSpan;
      if (['both', 'right'].includes(fields[i].clear)) {
        i += 1;
        break;
      }
      i += 1;
    }
    rows.push(React__default.createElement(
      antd.Row,
      { key: i, gutter: gutter },
      cols
    ));
  }
  return rows;
}

FormBuilder.defineWidget = function (name, widget) {
  var metaConvertor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  if (widgetMap[name]) throw new Error('Widget "' + name + '" already defined.');
  widgetMap[name] = {
    widget: widget,
    metaConvertor: metaConvertor
  };
};

FormBuilder.useForceUpdate = function () {
  var _React$useState = React__default.useState(),
      _React$useState2 = slicedToArray(_React$useState, 2),
      updateState = _React$useState2[1];

  var forceUpdate = React__default.useCallback(function () {
    return updateState({});
  }, []);
  return forceUpdate;
};

FormBuilder.useForm = function (f) {
  throw new Error('FormBuilder.useForm is removed. Please use Form.useForm().');
};

FormBuilder.createForm = function (ctx) {
  throw new Error('FormBuilder.createForm is removed. Please use Form.useForm for functional component and ref for class component.');
};
FormBuilder.propTypes = {
  meta: PropTypes.any
};

var mapOptions = function mapOptions(options) {
  if (!_.isArray(options)) {
    throw new Error('Options should be array in form builder meta.');
  }
  return options.map(function (opt) {
    if (_.isArray(opt)) {
      return { value: opt[0], label: opt[1] };
    } else if (_.isPlainObject(opt)) {
      return opt;
    } else {
      return { value: opt, label: opt };
    }
  });
};

FormBuilder.defineWidget('checkbox', antd.Checkbox, function (field) {
  return _extends({}, field, { valuePropName: 'checked' });
});

FormBuilder.defineWidget('switch', antd.Switch, function (field) {
  return _extends({}, field, { valuePropName: 'checked' });
});

FormBuilder.defineWidget('button', antd.Button);
FormBuilder.defineWidget('input', antd.Input);
FormBuilder.defineWidget('password', antd.Input.Password);
FormBuilder.defineWidget('textarea', antd.Input.TextArea);
FormBuilder.defineWidget('number', antd.InputNumber);
FormBuilder.defineWidget('date-picker', antd.DatePicker);
FormBuilder.defineWidget('radio', antd.Radio);
FormBuilder.defineWidget('radio-group', antd.Radio.Group, function (field) {
  var RadioComp = field.buttonGroup ? antd.Radio.Button : antd.Radio;
  if (field.options && !field.children) {
    return _extends({}, field, {
      widgetProps: _extends({}, field.widgetProps, {
        name: field.key
      }),
      children: mapOptions(field.options).map(function (opt) {
        return React__default.createElement(
          RadioComp,
          { value: opt.value, key: opt.value },
          opt.label
        );
      })
    });
  }
  return field;
});

FormBuilder.defineWidget('checkbox-group', antd.Checkbox.Group, function (field) {
  if (field.options && !field.children) {
    return _extends({}, field, {
      children: mapOptions(field.options).map(function (opt) {
        return React__default.createElement(
          antd.Checkbox,
          { value: opt.value, key: opt.value },
          opt.label
        );
      })
    });
  }
  return field;
});
FormBuilder.defineWidget('select', antd.Select, function (field) {
  if (field.options && !field.children) {
    return _extends({}, field, {
      children: mapOptions(field.options).map(function (opt) {
        return React__default.createElement(
          antd.Select.Option,
          { label: opt.label, value: opt.value, key: opt.value, disabled: opt.disabled },
          opt.children || opt.label
        );
      })
    });
  }
  return field;
});

// export default FormBuilder from './FormBuilder'

module.exports = FormBuilder;
//# sourceMappingURL=index.js.map
