import { LitElement } from 'lit';
import { Tree } from './Tree';
declare type keyType = string;
export declare type TreeItemProps = {
    type?: string | 'folder' | 'openfolder' | 'file';
    key: keyType;
    parent: Tree;
    value: any;
    onClick: Function;
};
export declare class TreeItem extends LitElement {
    static get styles(): import("lit").CSSResult;
    static get properties(): {
        type: {
            type: StringConstructor;
            reflect: boolean;
        };
        key: {
            type: StringConstructor;
            reflect: boolean;
        };
        open: {
            type: BooleanConstructor;
            reflect: boolean;
        };
    };
    type: TreeItemProps['type'];
    key: TreeItemProps['key'];
    li?: HTMLLIElement;
    value: TreeItemProps['value'];
    parent: TreeItemProps['parent'];
    open: boolean;
    onClick: TreeItemProps['onClick'];
    constructor(props: TreeItemProps);
    removeLast: () => void;
    render(): import("lit-html").TemplateResult<1>;
}
export {};
