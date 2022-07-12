import { LitElement } from 'lit';
export declare type OverlayProps = {
    open?: boolean;
};
export declare class Overlay extends LitElement {
    static get styles(): import("lit").CSSResult;
    static get properties(): {
        open: {
            type: BooleanConstructor;
            reflect: boolean;
        };
    };
    open: boolean;
    constructor(props?: OverlayProps);
    render(): import("lit-html").TemplateResult<1>;
}
