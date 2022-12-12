import React from 'react';
import noop from '@jswork/noop';
import { Checkbox, Dropdown, Button, MenuProps } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import nx from '@jswork/next';
import '@jswork/next-dom-event';

const CLASS_NAME = 'ac-checkable-dropdown';
const locales = { 'zh-CN': { selectAll: '全部' }, 'en-US': { selectAll: 'All' } };
type StdEventTarget = { target: { value: any } };
type StdCallback = (inEvent: StdEventTarget) => void;

type Props = {
  className?: string;
  lang?: string;
  items?: any[];
  value?: any[];
  width?: number;
  onChange?: StdCallback;
};

export class AcCheckableDropdown extends React.Component<Props> {
  static displayName = CLASS_NAME;
  static id = 1;
  static defaultProps = {
    lang: 'zh-CN',
    onChange: noop,
    items: [],
    value: [],
    width: 180
  };

  private readonly overlayClass = `${CLASS_NAME}-overlay--${AcCheckableDropdown.id++}`;

  state = {
    visible: false,
    value: this.props.value
  };

  private overlayRes: any;
  private winBlankRes: any;

  get indeterminate() {
    const { value } = this.state;
    return !!value?.length && value?.length < this.props.items!.length;
  }

  get menuItems() {
    const { items } = this.props;
    const _value = this.state.value;
    return [
      {
        key: 'select_all',
        label: (
          <Checkbox
            indeterminate={this.indeterminate}
            checked={_value?.length === items?.length}
            onChange={(e) => {
              const checked = e.target.checked;
              const val = checked ? items?.map((item) => item.value) : [];
              this.doChange(val);
            }}>
            ALL
          </Checkbox>
        )
      },
      { type: 'divider' },
      ...items!.map((opt) => {
        const shouldChecked = _value?.includes(opt.value);
        return {
          key: opt.value,
          label: (
            <Checkbox
              onChange={(e) => {
                const { checked } = e.target;
                const filtered = this.state.value?.filter((item) => item !== opt.value);
                const val = checked ? [...filtered!, opt.value] : filtered;
                this.doChange(val);
              }}
              checked={shouldChecked}
              data-value={opt.value}>
              {opt.label}
            </Checkbox>
          )
        };
      })
    ] as MenuProps['items'];
  }

  t = (inKey: string) => {
    const { lang } = this.props;
    return locales[lang!][inKey] || inKey;
  };

  doChange = (inValue) => {
    const { onChange } = this.props;
    const target = { value: inValue };
    this.setState(target);
    onChange!({ target });
  };

  componentDidMount() {
    // click blank, close overlay
    this.winBlankRes = nx.DomEvent.on(window, 'click', (e) => {
      const target = e.target as HTMLElement;
      const overlay = document.querySelector(`.${this.overlayClass}`) as HTMLDivElement;
      if (overlay && !overlay.contains(target)) {
        this.setState({ visible: false });
      }
    });
  }

  componentDidUpdate() {
    const { visible } = this.state;
    if (visible) {
      const overlay = document.querySelector(`.${this.overlayClass}`) as HTMLDivElement;
      if (overlay) {
        this.overlayRes = nx.DomEvent.on(overlay, 'mouseleave', () => {
          this.setState({ visible: false });
          this.overlayRes?.destroy();
        });
      }
    }
  }

  componentWillUnmount() {
    this.winBlankRes?.destroy();
    this.overlayRes?.destroy();
  }

  render() {
    const { width } = this.props;
    const { visible } = this.state;

    return (
      <Dropdown
        overlayClassName={this.overlayClass}
        open={visible}
        menu={{ items: this.menuItems }}>
        <Button
          className={`${CLASS_NAME}__btn`}
          style={{ width }}
          onMouseEnter={() => this.setState({ visible: true })}>
          <span className="is-label">{this.t('selectAll')}</span>
          <DownOutlined />
        </Button>
      </Dropdown>
    );
  }
}
