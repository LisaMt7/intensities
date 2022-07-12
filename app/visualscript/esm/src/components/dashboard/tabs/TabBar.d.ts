import { LitElement } from 'lit';
import { Tab } from './Tab';
import '../App';
export declare type TabBarProps = {
    tabs?: Tab[];
};
export declare const TabBarPropsList: {
    tabs: {
        type: ObjectConstructor;
    };
};
export declare class TabBar extends LitElement {
    tabs: TabBarProps['tabs'];
    static get styles(): import("lit").CSSResult;
    static get properties(): {
        tabs: {
            type: ObjectConstructor;
        };
    };
    constructor(props?: TabBarProps);
    render(): import("lit-html").TemplateResult<1>;
}
