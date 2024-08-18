import React from 'react';

declare const breadcrumbDefault: ({ item, index, items }: {
    item: any;
    index: any;
    items: any;
}) => React.JSX.Element;

interface Options$1 {
    component: React.ComponentType<any>;
    value?: string;
    label?: string;
    [key: string]: any;
}
/**
 * KV component template, for key-value pair.
 * @param item
 * @param index
 * @param options
 */
declare const kv: ({ item, index }: {
    item: any;
    index: any;
}, options: Options$1) => React.JSX.Element;
declare const checkboxKv: (args: any) => React.JSX.Element;
declare const selectKv: (args: any) => React.JSX.Element;
declare const radioKv: (args: any, opts: any) => React.JSX.Element;
declare const treeKv: ({ item }: {
    item: any;
}, cb: any) => React.JSX.Element;
declare const treeSelectKv: ({ item }: {
    item: any;
}, cb: any) => React.JSX.Element;

interface Options {
    component: React.ComponentType<any>;
    [key: string]: any;
}
/**
 * Raw component template, for array of items.
 * @param item
 * @param index
 * @param options
 */
declare const raw: ({ item, index }: {
    item: any;
    index: any;
}, options: Options) => React.JSX.Element;
declare const checkboxRaw: (args: any) => React.JSX.Element;
declare const selectRaw: (args: any) => React.JSX.Element;
declare const radioRaw: (args: any, opts: any) => React.JSX.Element;

declare const transferLabel: ({ item }: {
    item: any;
}, options?: any) => React.ReactNode;

export { breadcrumbDefault, checkboxKv, checkboxRaw, kv, radioKv, radioRaw, raw, selectKv, selectRaw, transferLabel, treeKv, treeSelectKv };
