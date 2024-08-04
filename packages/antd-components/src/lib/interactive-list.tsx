import noop from '@jswork/noop';
import ReactList from '@jswork/react-list';
import cx from 'classnames';
import React, { Component, HTMLAttributes } from 'react';
import deepEqual from 'fast-deep-equal';

const CLASS_NAME = 'ac-interactive-list';

type StdEventTarget = { target: { value: any } };
type StdCallback = (inEvent: StdEventTarget) => void;
type TemplateCallback = (
  item: { item: any; index: number; items: any[] },
  cb: any
) => React.ReactNode;

export type ReactInteractiveListProps = {
  /**
   * The extended className for component.
   */
  className?: string;
  /**
   * The minimum size.
   */
  min: number;
  /**
   * The max size.
   */
  max: number;
  /**
   * The data source.
   */
  items: any[];
  /**
   * The data item template.
   */
  template: TemplateCallback;
  /**
   * The action of `create` component.
   */
  templateCreate: (...args) => React.ReactNode;
  /**
   * The empty create template.
   */
  templateDefault: () => React.ReactNode;
  /**
   * The change handler.
   */
  onChange: StdCallback;
  /**
   * When trigger max/min boundary.
   */
  onError: StdCallback;
  /**
   * Forwards a ref to the underlying div element.
   */
  forwardedRef: any;
} & HTMLAttributes<any>;

interface ReactInteractiveListState {
  value: any[];
}

class ReactInteractiveList extends Component<ReactInteractiveListProps, ReactInteractiveListState> {
  static displayName = CLASS_NAME;
  static defaultProps = {
    min: 0,
    max: 10,
    items: [],
    template: noop,
    templateCreate: noop,
    templateDefault: noop,
    onChange: noop,
    onError: noop
  };

  get length() {
    const { value } = this.state;
    return value.length;
  }

  get isLteMin() {
    const { min } = this.props;
    return this.length <= min;
  }

  get isGteMax() {
    const { max } = this.props;
    return this.length >= max;
  }

  get listView() {
    const { value } = this.state;
    return <ReactList items={value} template={this.template} />;
  }

  get createView() {
    const { value } = this.state;
    const { templateCreate, templateDefault } = this.props;
    const cb = () => {
      if (this.isGteMax) return;
      value.push(templateDefault());
      this.handleChange(value);
    };
    return templateCreate({ items: value }, cb);
  }

  constructor(inProps) {
    super(inProps);
    const { items } = inProps;
    this.state = { value: [...items] };
  }

  shouldComponentUpdate(inProps) {
    const { items } = inProps;
    const isEqual = deepEqual(this.state.value, items);
    if (!isEqual) {
      this.setState({ value: [...items] });
    }
    return true;
  }

  template = ({ item, index }) => {
    const { template } = this.props;
    const { value } = this.state;
    const cb = () => {
      if (this.isLteMin) return;
      value.splice(index, 1);
      this.handleChange(value);
    };
    return template({ item, index, items: value }, cb);
  };

  handleChange = (inValue) => {
    const { onChange, onError, min, max } = this.props;
    const target = { value: inValue };
    this.setState(target, () => {
      onChange({ target });
      this.length < min && onError({ target: { value: 'EQ_MIN' } });
      this.length > max && onError({ target: { value: 'EQ_MAX' } });
    });
  };

  notify = (inValue) => {
    this.handleChange(inValue);
  };

  render() {
    const {
      className,
      forwardedRef,
      min,
      max,
      items,
      template,
      templateCreate,
      templateDefault,
      onChange,
      onError,
      ...props
    } = this.props;

    return (
      <div className={cx(CLASS_NAME, className)} ref={forwardedRef} {...props}>
        {this.listView}
        {this.createView}
      </div>
    );
  }
}

export const AcInteractiveList = React.forwardRef((props: any, ref) => {
  return <ReactInteractiveList {...props} ref={ref} />;
});
