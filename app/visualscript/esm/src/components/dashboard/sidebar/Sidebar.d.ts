import { LitElement } from 'lit';
export declare type SidebarProps = {
    closed?: boolean;
    content?: HTMLElement | '';
};
export declare class Sidebar extends LitElement {
    closed: SidebarProps['closed'];
    content: SidebarProps['content'];
    interacted: boolean;
    static get styles(): import("lit").CSSResult;
    static get properties(): {
        closed: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        content: {
            type: ObjectConstructor;
            reflect: boolean;
        };
    };
    constructor(props?: SidebarProps);
    render(): import("lit-html").TemplateResult<1>;
}
