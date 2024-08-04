import React from 'react';
import noop from '@jswork/noop';
import { Checkbox, Dropdown, Button, MenuProps } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import nx from '@jswork/next';
import '@jswork/next-dom-event';
import { SizeType } from 'antd/es/config-provider/SizeContext';

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
  size?: SizeType;
  disabled?: boolean;
  onChange?: StdCallback;
};

export class AcCheckableDropdown extends React.Component<Props> {
  static displayName = CLASS_NAME;
  static formSchema = CLASS_NAME;
  static id = 1;
  static defaultProps = {
    lang: 'zh-CN',
    onChange: noop,
    items: [],
    value: [],
    width: 140
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

  get label() {
    const { value } = this.state;
    const { items } = this.props;
    const labels = value?.map((val) => items?.find((item) => item.value === val).label);
    const isAll = value?.length === 0 || value?.length === items?.length;
    return isAll ? this.t('selectAll') : labels?.join(',');
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
            {this.t('selectAll')}
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
              checked={shouldChecked}>
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
    this.winBlankRes = nx.DomEvent.on(window as any, 'click', (e) => {
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

  /**
   * todo: 有朝一日，找出原因
   * 这里的 button disabled 不能生效，除非在 dropdown 内层套一个 Fragment。
   */
  render() {
    const { width, disabled, size } = this.props;
    const { visible } = this.state;

    return (
      <Dropdown
        disabled={disabled}
        overlayClassName={this.overlayClass}
        open={visible}
        menu={{ items: this.menuItems }}>
        <>
          <Button
            className={`${CLASS_NAME}__btn`}
            style={{ width }}
            size={size}
            disabled={disabled}
            onMouseEnter={() => this.setState({ visible: true })}>
            <span className="is-label">{this.label}</span>
            <DownOutlined />
          </Button>
        </>
      </Dropdown>
    );
  }
}
