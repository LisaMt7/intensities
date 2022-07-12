import { LitElement } from 'lit';
import "../general/Overlay";
import { Main } from './Main';
import { Sidebar } from '../dashboard';
import { Nav, Footer } from '../general';
import { App } from './App';
export declare const slotGrid: import("lit").CSSResult;
export declare type DashboardProps = {
    open?: boolean;
    closeHandler?: Function;
    global?: boolean;
    toggle?: HTMLElement | string;
    toggletext?: string;
};
export declare class Dashboard extends LitElement {
    static get styles(): import("lit").CSSResult;
    static get properties(): {
        toggletext: {
            type: StringConstructor;
            reflect: boolean;
        };
        toggle: {
            type: ObjectConstructor;
            reflect: boolean;
        };
        open: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        closeHandler: {
            type: FunctionConstructor;
            reflect: boolean;
        };
        global: {
            type: BooleanConstructor;
            reflect: boolean;
        };
    };
    open: DashboardProps['open'];
    closeHandler: DashboardProps['closeHandler'];
    toggletext: DashboardProps['toggletext'];
    global: DashboardProps['global'];
    apps: Map<string, App>;
    main: Main;
    nav: Nav;
    footer: Footer;
    sidebar: Sidebar;
    toggle: HTMLElement;
    constructor(props?: DashboardProps);
    render(): import("lit-html").TemplateResult<1>;
}
