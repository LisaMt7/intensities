import { LitElement } from 'lit';
import { Dashboard } from '../Dashboard';
import { TabToggle } from './TabToggle';
import { Control, ControlProps } from '../Control';
export declare const tabStyle: import("lit").CSSResult;
export declare type TabProps = {
    name?: string;
    controls?: ControlProps[];
    type?: 'app' | 'tab' | 'dropdown';
    on?: (target: TabToggle) => any;
    off?: (target: TabToggle) => any;
};
export declare const TabPropsLit: {
    name: {
        type: StringConstructor;
        reflect: boolean;
    };
    controls: {
        type: ArrayConstructor;
        reflect: boolean;
    };
    on: {
        type: FunctionConstructor;
        reflect: boolean;
    };
    type: {
        type: StringConstructor;
        reflect: boolean;
    };
    off: {
        type: FunctionConstructor;
        reflect: boolean;
    };
};
export declare class Tab extends LitElement {
    name: TabProps['name'];
    controls: TabProps['controls'];
    on: TabProps['on'];
    off: TabProps['off'];
    type: TabProps['type'];
    controlPanel: HTMLDivElement;
    dashboard: Dashboard;
    toggle: TabToggle;
    static get styles(): import("lit").CSSResult;
    static get properties(): {
        name: {
            type: StringConstructor;
            reflect: boolean;
        };
        controls: {
            type: ArrayConstructor;
            reflect: boolean;
        };
        on: {
            type: FunctionConstructor;
            reflect: boolean;
        };
        type: {
            type: StringConstructor;
            reflect: boolean;
        };
        off: {
            type: FunctionConstructor;
            reflect: boolean;
        };
    };
    constructor(props?: TabProps);
    willUpdate(changedProps: any): void;
    addControl: (instance: Control) => void;
    updated: () => void;
    render(): import("lit-html").TemplateResult<1>;
}
