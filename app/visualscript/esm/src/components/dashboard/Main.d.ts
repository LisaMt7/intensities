import { LitElement } from 'lit';
import { Tab } from './tabs/Tab';
import './App';
import './tabs/TabToggle';
import './tabs/TabBar';
export declare type MainProps = {};
export declare class Main extends LitElement {
    tabs: Map<string, Tab>;
    static get styles(): import("lit").CSSResult;
    static get properties(): {
        tabs: {
            type: ObjectConstructor;
        };
    };
    constructor(props?: MainProps);
    getTabs: () => any[];
    render(): import("lit-html").TemplateResult<1>;
}
