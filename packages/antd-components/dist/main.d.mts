import * as antd from 'antd';
import { InputProps, BreadcrumbProps, MenuProps, CheckboxProps, PopconfirmProps, ButtonProps, DatePickerProps, InputNumberProps, RateProps, SelectProps, SliderSingleProps, SwitchProps, TimePickerProps, TransferProps, TreeProps, TreeSelectProps, UploadFile, UploadProps } from 'antd';
import React, { HTMLAttributes, Component, ReactNode } from 'react';
import { TemplateArgs } from '@jswork/react-list';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import { CheckableTagProps } from 'antd/es/tag';
import { CheckboxGroupProps } from 'antd/es/checkbox';
import * as rc_input_lib_interface from 'rc-input/lib/interface';
import { RangePickerProps } from 'antd/es/date-picker';
import { SearchProps, TextAreaProps } from 'antd/es/input';
import { SliderRangeProps } from 'antd/es/slider';
import dayjs from 'dayjs';
import { DraggerProps } from 'antd/es/upload';
import { UploadChangeParam } from 'antd/es/upload/interface';

declare global {
    interface NxStatic {
        alert: typeof alert;
        confirm: typeof confirm;
        prompt: typeof prompt;
    }
}
declare const alert: (inMessage: string, inTitle?: String) => {
    destroy: () => void;
    update: (configUpdate: antd.ModalFuncProps | ((prevConfig: antd.ModalFuncProps) => antd.ModalFuncProps)) => void;
};
declare const confirm: (inMessage: string, inTitle?: String) => Promise<unknown>;
declare const prompt: (inMessage: string, inOptions?: InputProps) => Promise<unknown>;

type StdEventTarget$q = {
    target: {
        value: any;
    };
};
type StdCallback$q = (inEvent: StdEventTarget$q) => void;
type Props$q = {
    className?: string;
    items?: any[];
    template?: (args: TemplateArgs) => React.ReactNode;
    value?: number;
    onChange?: StdCallback$q;
} & BreadcrumbProps;
declare class AcBreadcrumb extends React.Component<Props$q> {
    static displayName: string;
    static defaultProps: {
        onChange: any;
        template: ({ item, index, items }: {
            item: any;
            index: any;
            items: any;
        }) => React.JSX.Element;
    };
    render(): React.JSX.Element;
}

type StdEventTarget$p = {
    target: {
        value: any;
    };
};
type StdCallback$p = (inEvent: StdEventTarget$p) => void;
type Props$p = {
    className?: string;
    lang?: string;
    items?: any[];
    value?: any[];
    width?: number;
    size?: SizeType;
    disabled?: boolean;
    onChange?: StdCallback$p;
};
declare class AcCheckableDropdown extends React.Component<Props$p> {
    static displayName: string;
    static formSchema: string;
    static id: number;
    static defaultProps: {
        lang: string;
        onChange: any;
        items: never[];
        value: never[];
        width: number;
    };
    private readonly overlayClass;
    state: {
        visible: boolean;
        value: any[] | undefined;
    };
    private overlayRes;
    private winBlankRes;
    get indeterminate(): boolean;
    get label(): any;
    get menuItems(): MenuProps["items"];
    t: (inKey: string) => any;
    doChange: (inValue: any) => void;
    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    /**
     * todo: 有朝一日，找出原因
     * 这里的 button disabled 不能生效，除非在 dropdown 内层套一个 Fragment。
     */
    render(): React.JSX.Element;
}

type StdEventTarget$o = {
    target: {
        value: any;
    };
};
type StdCallback$o = (inEvent: StdEventTarget$o) => void;
/**
 * @see https://ant.design/components/tag-cn/#Tag.CheckableTag
 */
type Props$o = {
    className?: string;
    value?: boolean;
    disabled?: boolean;
    closeable?: boolean;
    toggleable?: boolean;
    propagation?: boolean;
    onChange?: StdCallback$o;
    onCloseClick?: StdCallback$o;
} & Omit<CheckableTagProps, 'checked'>;
declare class AcCheckableTag extends React.Component<Props$o> {
    static displayName: string;
    static formSchema: string;
    static defaultProps: {
        value: boolean;
        closeable: boolean;
        disabled: boolean;
        toggleable: boolean;
        propagation: boolean;
        onChange: any;
        onCloseClick: any;
    };
    state: {
        value: boolean;
    };
    get closeIcon(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | null;
    shouldComponentUpdate(nextProps: Readonly<Props$o>): boolean;
    handleChange: (inEvent: any) => void;
    handleCloseClick: (inEvent: any) => void;
    render(): React.JSX.Element;
}

type StdEventTarget$n = {
    target: {
        value: any;
    };
};
type StdCallback$n = (inEvent: StdEventTarget$n) => void;
type Props$n = {
    /**
     * Main className.
     */
    className?: string;
    /**
     * The language key.
     */
    lang?: string;
    /**
     * The component data soruce.
     */
    items?: any[];
    /**
     * Runtime value.
     */
    value?: any[];
    /**
     * The event handler for `change`.
     */
    onChange?: StdCallback$n;
    /**
     * The disabled state.
     */
    disabled?: boolean;
};
declare class AcCheckableTagList extends React.Component<Props$n> {
    static displayName: string;
    static formSchema: string;
    static defaultProps: {
        lang: string;
        value: never[];
        onChange: any;
    };
    state: {
        value: any[] | undefined;
    };
    t: (inKey: string) => any;
    shouldComponentUpdate(nextProps: Readonly<Props$n>): boolean;
    handleChange: (inEvent: any) => void;
    handleClearAll: () => void;
    render(): React.JSX.Element;
}

type StdEventTarget$m = {
    target: {
        value: any;
    };
};
type StdCallback$m = (inEvent: StdEventTarget$m) => void;
type Props$m = {
    className?: string;
    value?: boolean;
    onChange?: StdCallback$m;
} & CheckboxProps & HTMLAttributes<any>;
declare class AcCheckbox extends React.Component<Props$m> {
    static displayName: string;
    static formSchema: string;
    static defaultProps: {
        onChange: any;
    };
    state: {
        value: any;
    };
    shouldComponentUpdate(nextProps: Readonly<Props$m>): boolean;
    handleChange: (inEvent: any) => void;
    render(): React.JSX.Element;
}

type StdEventTarget$l = {
    target: {
        value: any;
    };
};
type StdCallback$l = (inEvent: StdEventTarget$l) => void;
type TemplateCallback$3 = (item: {
    item: any;
    index: number;
}) => React.ReactNode;
type AcCheckboxGroupProps = {
    className?: string;
    value?: any[];
    items?: any[];
    onChange?: StdCallback$l;
    onSearch?: StdCallback$l;
    template?: TemplateCallback$3;
} & CheckboxGroupProps;
declare class AcCheckboxGroup extends React.Component<AcCheckboxGroupProps> {
    static displayName: string;
    static formSchema: string;
    static defaultProps: {
        items: never[];
        value: never[];
        template: (args: any) => React.JSX.Element;
        onChange: any;
        onSearch: any;
    };
    state: {
        value: any[] | undefined;
    };
    shouldComponentUpdate(nextProps: Readonly<AcCheckboxGroupProps>): boolean;
    handleChange: (inEvent: any) => void;
    render(): React.JSX.Element;
}

declare class AcCodeFlask extends React.Component {
    static displayName: string;
    static formSchema: string;
    static defaultProps: {
        onChange: any;
    };
    render(): React.JSX.Element;
}

interface AcConfirmButtonProps extends Omit<PopconfirmProps, 'title'> {
    className?: string;
    lang?: string;
    title?: string;
    type?: ButtonProps['type'] | 'raw' | 'anchor';
    childProps?: ButtonProps;
    onClick?: React.MouseEventHandler<HTMLElement>;
}
declare class AcConfirmButton extends Component<AcConfirmButtonProps> {
    static displayName: string;
    static formSchema: string;
    static defaultProps: {
        lang: string;
        type: string;
        childProps: {};
    };
    get computedChildren(): string | number | boolean | Iterable<React.ReactNode> | React.JSX.Element | null | undefined;
    handleCancel: () => void;
    t: (inKey: any) => any;
    render(): React.JSX.Element;
}

type StdEventTarget$k = {
    target: {
        value: any;
    };
};
type StdCallback$k = (inEvent: StdEventTarget$k) => void;
type Props$l = {
    className?: string;
    value?: any;
    dayjs?: any;
    defaultValue?: any;
    onChange?: StdCallback$k;
} & DatePickerProps;
declare class AcDatePicker extends React.Component<Props$l> {
    static displayName: string;
    static formSchema: string;
    static defaultProps: Props$l;
    get valueFormat(): any;
    get value(): any;
    handleChange: (value: Date) => void;
    render(): React.JSX.Element;
}

type StdEventTarget$j = {
    target: {
        value: any;
    };
};
type StdCallback$j = (inEvent: StdEventTarget$j) => void;
type Props$k = {
    /**
     * The extended className for component.
     */
    className?: string;
    /**
     * Default value.
     */
    value?: any[];
    /**
     * The change handler.
     */
    onChange?: StdCallback$j;
    /**
     * The minimum tag number.
     */
    min?: number;
    /**
     * The maximum tags number.
     */
    max?: number;
    /**
     * If set readOnly.
     */
    readOnly?: boolean;
    /**
     * If set disabled.
     */
    disabled?: boolean;
    /**
     * Trigger key, default is `Space`.
     */
    triggers?: string[];
};
declare class AcEditableTagGroup extends React.Component<Props$k> {
    static displayName: string;
    static formSchema: string;
    static defaultProps: {
        value: never[];
        min: number;
        max: number;
        onChange: any;
        triggers: string[];
    };
    private inputRef;
    private btnRef;
    private rootForwardedRef;
    private rootRef;
    private imeStartRes;
    private imeEndRes;
    get latestInput(): HTMLInputElement;
    state: {
        value: any[] | undefined;
        ime: boolean;
    };
    template: ({ item, index }: {
        item: any;
        index: any;
    }, cb: any) => React.JSX.Element;
    templateCreate: () => React.JSX.Element | null;
    /**
     * Default item's value.
     */
    templateDefault: () => string;
    /**
     * Add new default item.
     */
    actionCreate: () => void;
    /**
     * Focus latest input element if exists.
     * @param inDelay
     */
    actionFocusLast: (inDelay?: number) => void;
    handleInputChange: (inIndex: any, inEvent: any) => void;
    handleInputBlur: () => void;
    handleInputKeyDown: (inEvent: any) => void;
    handleInterChange: (inEvent: any) => void;
    handleChange: (inValue: any, inCallback?: any) => void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    shouldComponentUpdate(nextProps: Readonly<Props$k>): boolean;
    render(): React.JSX.Element;
}

type StdEventTarget$i = {
    target: {
        value: any;
    };
};
type StdCallback$i = (inEvent: StdEventTarget$i) => void;
type Props$j = {
    className?: string;
    onChange?: StdCallback$i;
    autoComplete?: boolean;
} & InputProps;
declare class AcInput extends React.Component<Props$j> {
    static displayName: string;
    static formSchema: string;
    static defaultProps: {
        onChange: any;
        autoComplete: boolean;
    };
    state: {
        value: rc_input_lib_interface.ValueType;
    };
    shouldComponentUpdate(inProps: Readonly<Props$j>): boolean;
    handleChange: (inEvent: any) => void;
    get complete(): "on" | "off";
    render(): React.JSX.Element;
}

declare class AcInputHidden extends React.Component {
    static displayName: string;
    static formSchema: string;
    static defaultProps: {};
    render(): React.JSX.Element;
}

type StdEventTarget$h = {
    target: {
        value: any;
    };
};
type StdCallback$h = (inEvent: StdEventTarget$h) => void;
type Props$i = {
    className?: string;
    value?: number;
    onChange?: StdCallback$h;
} & InputNumberProps;
declare class AcInputNumber extends React.Component<Props$i> {
    static displayName: string;
    static formSchema: string;
    static defaultProps: {
        onChange: any;
    };
    state: {
        value: number | undefined;
    };
    shouldComponentUpdate(inProps: Readonly<Props$i>): boolean;
    handleChange: (inEvent: any) => void;
    render(): React.JSX.Element;
}

type StdEventTarget$g = {
    target: {
        value: any;
    };
};
type StdCallback$g = (inEvent: StdEventTarget$g) => void;
type Props$h = {
    className?: string;
    items?: string[];
    disabled?: boolean;
    onChange?: StdCallback$g;
} & React.HTMLAttributes<HTMLDivElement>;
type State$1 = {
    items?: string[];
    inputValue: string;
    isComposite: boolean;
};
declare class AcInputTags extends React.Component<Props$h, State$1> {
    static displayName: string;
    static formSchema: string;
    static defaultProps: {
        items: never[];
        disabled: boolean;
        onChange: any;
    };
    inputRef: React.RefObject<HTMLInputElement>;
    constructor(inProps: any);
    shouldComponentUpdate(nextProps: Readonly<Props$h>): boolean;
    handleInputChange: (inEvent: any) => void;
    handleInputKeyAction: (inEvent: any) => false | void;
    handleTagRemove: (inIndex: any, inForce?: boolean) => void;
    handleMouseEnter: () => void;
    execChange: (inItems: any) => void;
    render(): React.JSX.Element;
}

type StdEventTarget$f = {
    target: {
        value: any;
    };
};
type StdCallback$f = (inEvent: StdEventTarget$f) => void;
type Props$g = {
    className?: string;
    value?: string;
    onChange?: StdCallback$f;
    autoComplete?: boolean;
    labelCreate?: string;
    labelRemove?: string;
} & InputProps;
declare class AcInputToken extends React.Component<Props$g> {
    static displayName: string;
    static formSchema: string;
    static defaultProps: {
        onChange: any;
        autoComplete: boolean;
        labelCreate: string;
        labelRemove: string;
    };
    private rootRef;
    state: {
        value: string | (string & readonly string[]) | undefined;
    };
    shouldComponentUpdate(nextProps: Readonly<Props$g>): boolean;
    get complete(): "on" | "off";
    get tokenView(): React.JSX.Element;
    handleTokenCreate: () => void;
    handleTokenRemove: () => void;
    handleChange: (inEvent: any) => void;
    doChange: (inValue: any) => void;
    render(): React.JSX.Element;
}

interface Value {
    option: string;
    keyword: string;
}
type AcPreSelectProps = {
    /**
     * The extended className for component.
     */
    className?: string;
    /**
     * Default value.
     */
    value?: Value;
    /**
     * Select options.
     */
    items?: any[];
    /**
     * The change handler.
     */
    onChange?: Function;
    /**
     * The handler for search.
     */
    onSearch?: Function;
    /**
     * If use search input.
     */
    searchable?: boolean;
    /**
     * The prefix select options.
     */
    selectOptions?: any;
    /**
     * The suffix input options.
     */
    inputOptions?: any;
};
declare class AcPreSelect extends React.Component<AcPreSelectProps> {
    static displayName: string;
    static formSchema: string;
    static version: string;
    static defaultProps: {
        onChange: any;
        onSearch: any;
        searchable: boolean;
    };
    state: {
        value: Value | undefined;
    };
    get addonView(): React.JSX.Element;
    handleFiledAction: (inField: any, inEvent: any, inCallback: any) => void;
    handleChange: (inField: any, inEvent: any) => void;
    handleSearch: (inField: any, inEvent: any) => void;
    render(): React.JSX.Element;
}

type StdEventTarget$e = {
    target: {
        value: any;
    };
};
type StdCallback$e = (inEvent: StdEventTarget$e) => void;
type TemplateCallback$2 = (item: {
    item: any;
    index: number;
}, opts?: any) => React.ReactNode;
type Props$f = {
    className?: string;
    value?: any;
    defaultValue?: any;
    items?: any[];
    onChange?: StdCallback$e;
    onSearch?: StdCallback$e;
    template?: TemplateCallback$2;
    templateOptions?: any;
    buttonStyle?: 'solid' | 'outline';
} & HTMLAttributes<any>;
declare class AcRadioGroup extends React.Component<Props$f> {
    static displayName: string;
    static formSchema: string;
    static defaultProps: {
        items: never[];
        template: (args: any, opts: any) => React.JSX.Element;
        onChange: any;
        onSearch: any;
    };
    get templateCallback(): (item: any) => React.ReactNode;
    state: {
        value: any;
    };
    static getDerivedStateFromProps(inProps: Readonly<Props$f>, inState: any): {
        value: any;
    } | null;
    handleChange: (inEvent: any) => void;
    render(): React.JSX.Element;
}

type StdEventTarget$d = {
    target: {
        value: any;
    };
};
type StdCallback$d = (inEvent: StdEventTarget$d) => void;
type Props$e = {
    className?: string;
    value?: any;
    defaultValue?: any;
    onChange?: StdCallback$d;
} & RangePickerProps;
declare class AcRangePicker extends React.Component<Props$e> {
    static displayName: string;
    static formSchema: string;
    static defaultProps: {
        onChange: any;
        format: string;
    };
    handleChange: (inEvent: any) => void;
    parse: (inValue: any) => any;
    stringify: (inValue: any) => any;
    render(): React.JSX.Element;
}

type StdEventTarget$c = {
    target: {
        value: any;
    };
};
type StdCallback$c = (inEvent: StdEventTarget$c) => void;
type Props$d = {
    className?: string;
    value?: number;
    onChange?: StdCallback$c;
} & RateProps;
declare class AcRate extends React.Component<Props$d> {
    static displayName: string;
    static formSchema: string;
    static defaultProps: {
        onChange: any;
    };
    handleChange: (inEvent: any) => void;
    render(): React.JSX.Element;
}

type StdEventTarget$b = {
    target: {
        value: any;
    };
};
type StdCallback$b = (inEvent: StdEventTarget$b) => void;
type Props$c = {
    className?: string;
    value?: boolean;
    onChange?: StdCallback$b;
    onSearch?: StdCallback$b;
    autoComplete?: boolean;
} & SearchProps;
declare class AcSearch extends React.Component<Props$c> {
    static displayName: string;
    static formSchema: string;
    static defaultProps: {
        onChange: any;
        onSearch: any;
        autoComplete: boolean;
        placeholder: string;
    };
    get complete(): "on" | "off";
    handleSearch: (inEvent: any) => void;
    render(): React.JSX.Element;
}

type StdEventTarget$a = {
    target: {
        value: any;
    };
};
type StdCallback$a = (inEvent: StdEventTarget$a) => void;
type TemplateCallback$1 = (item: {
    item: any;
    index: number;
}) => React.ReactNode;
type Props$b = {
    className?: string;
    items?: any[];
    kv?: Record<string, string>;
    onChange?: StdCallback$a;
    onSearch?: StdCallback$a;
    template?: TemplateCallback$1;
} & Omit<SelectProps, 'options'>;
declare class AcSelect extends React.Component<Props$b> {
    static displayName: string;
    static formSchema: string;
    static defaultProps: {
        placeholder: string;
        items: never[];
        kv: {
            label: string;
            value: string;
        };
        template: (args: any) => React.JSX.Element;
        onChange: any;
        onSearch: any;
    };
    state: {
        value: any;
    };
    shouldComponentUpdate(nextProps: Readonly<Props$b>): boolean;
    handleChange: (inValue: any) => void;
    template: (args: any) => string | number | boolean | Iterable<React.ReactNode> | React.JSX.Element | null | undefined;
    render(): React.JSX.Element;
}

type StdEventTarget$9 = {
    target: {
        value: any;
    };
};
type StdCallback$9 = (inEvent: StdEventTarget$9) => void;
type Props$a = {
    className?: string;
    onChange?: StdCallback$9;
} & SliderSingleProps;
declare class AcSlider extends React.Component<Props$a> {
    static displayName: string;
    static formSchema: string;
    static defaultProps: {
        onChange: any;
    };
    handleChange: (inEvent: any) => void;
    render(): React.JSX.Element;
}

type StdEventTarget$8 = {
    target: {
        value: any;
    };
};
type StdCallback$8 = (inEvent: StdEventTarget$8) => void;
type Props$9 = {
    className?: string;
    range?: true;
    onChange?: StdCallback$8;
} & Omit<SliderRangeProps, 'range'>;
declare class AcSliderRange extends React.Component<Props$9> {
    static displayName: string;
    static formSchema: string;
    static defaultProps: {
        onChange: any;
    };
    handleChange: (inEvent: any) => void;
    render(): React.JSX.Element;
}

type StdEventTarget$7 = {
    target: {
        value: any;
    };
};
type StdCallback$7 = (inEvent: StdEventTarget$7) => void;
type Props$8 = {
    className?: string;
    value?: boolean;
    onChange?: StdCallback$7;
} & SwitchProps;
declare class AcSwitch extends React.Component<Props$8> {
    static displayName: string;
    static formSchema: string;
    static defaultProps: {
        onChange: any;
    };
    state: {
        value: boolean;
    };
    shouldComponentUpdate(nextProps: Readonly<Props$8>): boolean;
    handleChange: (value: any) => void;
    render(): React.JSX.Element;
}

type StdEventTarget$6 = {
    target: {
        value: any;
    };
};
type StdCallback$6 = (inEvent: StdEventTarget$6) => void;
type Props$7 = {
    className?: string;
    value?: boolean;
    onChange?: StdCallback$6;
} & TextAreaProps;
declare class AcTextarea extends React.Component<Props$7> {
    static displayName: string;
    static formSchema: string;
    static defaultProps: {
        onChange: any;
    };
    render(): React.JSX.Element;
}

type StdEventTarget$5 = {
    target: {
        value: any;
    };
};
type StdCallback$5 = (inEvent: StdEventTarget$5) => void;
type Props$6 = {
    className?: string;
    value?: string | dayjs.Dayjs;
    defaultValue?: string | dayjs.Dayjs;
    onChange?: StdCallback$5;
} & Omit<TimePickerProps, 'value' | 'defaultValue'>;
declare class AcTimePicker extends React.Component<Props$6> {
    static displayName: string;
    static formSchema: string;
    static defaultProps: {
        onChange: any;
        format: string;
    };
    handleChange: (inEvent: any) => void;
    parse: (inValue: any) => dayjs.Dayjs;
    stringify: (inValue: any) => any;
    normalize: (inValues: any) => any;
    render(): React.JSX.Element;
}

type StdEventTarget$4 = {
    target: {
        value: any;
    };
};
type StdCallback$4 = (inEvent: StdEventTarget$4) => void;
type TemplateCallback = (item: {
    item: any;
}, options?: any) => React.ReactNode;
type Props$5 = {
    className?: string;
    items?: any[];
    template: TemplateCallback;
    value?: any[];
    onChange?: StdCallback$4;
} & TransferProps<any>;
declare class AcTransfer extends React.Component<Props$5> {
    static displayName: string;
    static formSchema: string;
    static defaultProps: {
        items: never[];
        template: ({ item }: {
            item: any;
        }, options?: any) => React.ReactNode;
        onChange: any;
    };
    get templateCallback(): any;
    state: {
        value: any[] | undefined;
    };
    shouldComponentUpdate(nextProps: Readonly<Props$5>): boolean;
    handleChange: (inEvent: any) => void;
    render(): React.JSX.Element;
}

type Props$4 = {
    className?: string;
    items?: any[];
    kv?: Record<string, string>;
    template?: any;
    itemsKey?: string | ((index: number, item: any) => any);
    directory?: boolean;
} & TreeProps;
declare class AcTree extends React.Component<Props$4> {
    static displayName: string;
    static formSchema: string;
    static defaultProps: {
        directory: boolean;
        items: never[];
        kv: {
            label: string;
            value: string;
        };
        template: ({ item }: {
            item: any;
        }, cb: any) => React.JSX.Element;
        itemsKey: string;
    };
    get childView(): any;
    template: (args: any) => any;
    render(): React.JSX.Element | null;
}

type StdEventTarget$3 = {
    target: {
        value: any;
    };
};
type StdCallback$3 = (inEvent: StdEventTarget$3) => void;
type Props$3 = {
    className?: string;
    items?: any[];
    template?: any;
    itemsKey?: string | ((index: number, item: any) => any);
    onChange?: StdCallback$3;
} & TreeSelectProps;
declare class AcTreeSelect extends React.Component<Props$3> {
    static displayName: string;
    static formSchema: string;
    static defaultProps: {
        items: never[];
        template: ({ item }: {
            item: any;
        }, cb: any) => React.JSX.Element;
        itemsKey: string;
        onChange: any;
    };
    get childView(): any;
    handleChange: (inValue: any) => void;
    render(): React.JSX.Element;
}

type StdEventTarget$2 = {
    target: {
        value: any;
    };
};
type StdCallback$2 = (inEvent: StdEventTarget$2) => void;
type CustomRequest$1 = (inEvent: any) => Promise<any>;
type Props$2 = {
    className?: string;
    value?: any[];
    defaultValue?: any[];
    onChange?: StdCallback$2;
    onRequest?: CustomRequest$1;
} & DraggerProps;
declare class AcUploadDragger extends React.Component<Props$2> {
    static displayName: string;
    static formSchema: string;
    static defaultProps: {
        onChange: any;
        onRequest: (inEvent: any) => Promise<any>;
    };
    handleChange: (inEvent: any) => void;
    handleCustomRequest: (inRequestOption: any) => void;
    render(): React.JSX.Element;
}

type StdEventTarget$1 = {
    target: {
        value: any;
    };
};
type StdCallback$1 = (inEvent: StdEventTarget$1) => void;
type Props$1 = {
    className?: string;
    value?: any[] | [];
    onChange?: StdCallback$1;
    transformResponse?: (inResponse: any) => any;
    transformURL?: (inPid: any) => string;
} & DraggerProps;
type State = {
    fileList: any[];
};
declare class AcAbstractUpload extends React.Component<Props$1, State> {
    protected rootRef: React.RefObject<HTMLDivElement>;
    protected sortable: any;
    protected viewer: any;
    toFileList: (inUrls: any[] | any) => any[];
    constructor(inProps: any);
    componentDidMount(): Promise<void>;
    shouldComponentUpdate(nextProps: Readonly<Props$1>): boolean;
    mountSortable(el: any): void;
    mountViewer(el: any): Promise<void>;
    componentWillUnmount(): void;
    handlePreview: (file: UploadFile<any>) => void;
    handleChange: (inEvent: UploadChangeParam<UploadFile<any>>) => void;
    handleSortEnd: (inEvent: any) => void;
    doChange: (inValue: any) => void;
    previewFile: (file: any) => Promise<string>;
    render(): ReactNode;
}

declare class AcUploadPicture extends AcAbstractUpload {
    static displayName: string;
    static formSchema: string;
    static defaultProps: {
        onChange: any;
        value: never[];
        maxCount: number;
        transformURL: (pid: any) => any;
        transformResponse: (inFileList: any) => any;
    };
    render(): React.JSX.Element;
}

declare class AcUploadPictureCard extends AcAbstractUpload {
    static displayName: string;
    static formSchema: string;
    static defaultProps: {
        onChange: any;
        value: never[];
        transformURL: (pid: any) => any;
        transformResponse: (inFileList: any) => any;
    };
    render(): React.JSX.Element;
}

type StdEventTarget = {
    target: {
        value: any;
    };
};
type StdCallback = (inEvent: StdEventTarget) => void;
type CustomRequest = (inEvent: any) => Promise<any>;
type Props = {
    className?: string;
    value?: number;
    onChange?: StdCallback;
    onRequest?: CustomRequest;
    btnProps?: ButtonProps;
} & UploadProps;
declare class AcUpload extends React.Component<Props> {
    static displayName: string;
    static formSchema: string;
    static defaultProps: {
        onChange: any;
        onRequest: (inEvent: any) => Promise<any>;
    };
    handleChange: (inEvent: any) => void;
    handleCustomRequest: (inRequestOption: any) => void;
    render(): React.JSX.Element;
}

export { AcBreadcrumb, AcCheckableDropdown, AcCheckableTag, AcCheckableTagList, AcCheckbox, AcCheckboxGroup, type AcCheckboxGroupProps, AcCodeFlask, AcConfirmButton, type AcConfirmButtonProps, AcDatePicker, AcEditableTagGroup, AcInput, AcInputHidden, AcInputNumber, AcInputTags, AcInputToken, AcPreSelect, type AcPreSelectProps, AcRadioGroup, AcRangePicker, AcRate, AcSearch, AcSelect, AcSlider, AcSliderRange, AcSwitch, AcTextarea, AcTimePicker, AcTransfer, AcTree, AcTreeSelect, AcUpload, AcUploadDragger, AcUploadPicture, AcUploadPictureCard, type Value, alert, confirm, prompt };
