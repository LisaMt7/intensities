import { LitElement } from 'lit';
export interface ButtonProps {
    /**
     * Is this the principal call to action on the page?
     */
    primary?: boolean;
    /**
     * What background color to use
     */
    backgroundColor?: string;
    /**
     * How large should the button be?
     */
    size?: 'extra-small' | 'small' | 'medium' | 'large';
    /**
     * Optional click handler
     */
    onClick?: (ev: Event) => any;
}
export declare class Button extends LitElement {
    static get styles(): import("lit").CSSResult;
    static get properties(): {
        primary: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        backgroundColor: {
            type: StringConstructor;
            reflect: boolean;
        };
        size: {
            type: StringConstructor;
            reflect: boolean;
        };
        onClick: {
            type: FunctionConstructor;
            reflect: boolean;
        };
    };
    primary: ButtonProps['primary'];
    backgroundColor: ButtonProps['backgroundColor'];
    size: ButtonProps['size'];
    onClick: ButtonProps['onClick'];
    constructor(props?: ButtonProps);
    willUpdate(_: any): void;
    render(): import("lit-html").TemplateResult<1>;
}
