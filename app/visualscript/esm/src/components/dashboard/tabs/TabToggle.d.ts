import { LitElement } from 'lit';
import { Tab } from './Tab';
export declare type TabToggleProps = {
    tab: Tab;
    selected?: boolean;
    grow?: boolean;
};
export declare const TabTogglePropsList: {
    selected: {
        type: BooleanConstructor;
        reflect: boolean;
    };
    grow: {
        type: BooleanConstructor;
        reflect: boolean;
    };
};
export declare class TabToggle extends LitElement {
    to: Tab;
    selected: TabToggleProps['selected'];
    static get styles(): import("lit").CSSResult;
    static get properties(): {
        selected: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        grow: {
            type: BooleanConstructor;
            reflect: boolean;
        };
    };
    grow: TabToggleProps['grow'];
    constructor(props: TabToggleProps);
    select: (toggles?: any) => void;
    render(): import("lit-html").TemplateResult<1>;
}
