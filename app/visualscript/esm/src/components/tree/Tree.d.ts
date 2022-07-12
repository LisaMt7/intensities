import { LitElement } from 'lit';
import { TreeItem } from './TreeItem';
declare type keyType = string;
export declare type TreeProps = {
    target: {
        [x: string]: any;
    };
    depth?: number;
    onClick?: Function;
};
export declare class Tree extends LitElement {
    static get styles(): import("lit").CSSResult;
    static get properties(): {
        keys: {
            type: ObjectConstructor;
            reflect: boolean;
        };
        depth: {
            type: NumberConstructor;
            reflect: boolean;
        };
        onClick: {
            type: FunctionConstructor;
            reflect: boolean;
        };
    };
    target: TreeProps['target'];
    onClick: TreeProps['onClick'];
    keys: (keyType)[];
    depth: TreeProps['depth'];
    constructor(props?: TreeProps);
    set: (target?: {}) => Promise<void>;
    getElement: (key: keyType, o: any) => Promise<TreeItem>;
    render(): import("lit-html/directive").DirectiveResult<typeof import("lit-html/directives/until.js").UntilDirective>;
}
export {};
