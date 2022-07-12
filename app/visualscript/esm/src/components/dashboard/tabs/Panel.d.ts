import { LitElement } from 'lit';
import { Tab } from './Tab';
import './TabToggle';
import './TabBar';
import { TabBar } from './TabBar';
export declare type PanelProps = {
    minTabs?: number;
};
export declare class Panel extends LitElement {
    static get styles(): import("lit").CSSResult;
    static get properties(): {
        tabLabels: {
            type: ObjectConstructor;
            reflect: boolean;
        };
        tabs: {
            type: ObjectConstructor;
        };
    };
    minTabs: PanelProps['minTabs'];
    tabs: Map<string, Tab>;
    tabLabels: string[];
    activeTab: number;
    bar: TabBar;
    constructor(props?: PanelProps);
    reset: () => void;
    addTab: (tab: any, switchTo?: boolean) => void;
    removeTab: (tab: Tab | string) => void;
    updateTabs: () => void;
    getTabs: () => Tab[];
    render(): import("lit-html").TemplateResult<1>;
}
