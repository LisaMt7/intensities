import { LitElement } from 'lit';
export interface IconProps {
    type?: string;
}
export declare class Icon extends LitElement {
    static get styles(): import("lit").CSSResult;
    static get properties(): {
        type: {
            type: StringConstructor;
            reflect: boolean;
        };
    };
    type: IconProps['type'];
    constructor(props?: IconProps);
    render(): import("lit-html").TemplateResult<1>;
}
