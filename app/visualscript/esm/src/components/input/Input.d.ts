import { LitElement } from "lit-element";
export interface InputProps {
    value?: string;
    outline?: boolean;
    disabled?: boolean;
    type?: string;
    label?: string;
    persist?: boolean;
    onChange?: Function;
    onInput?: Function;
}
export declare class Input extends LitElement {
    value: InputProps['value'];
    outline: InputProps['outline'];
    disabled: InputProps['disabled'];
    type: InputProps['type'];
    label: InputProps['label'];
    persist: InputProps['persist'];
    onChange: InputProps['onChange'];
    onInput: InputProps['onInput'];
    static get properties(): {
        label: {
            type: StringConstructor;
            reflect: boolean;
        };
        persist: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        value: {
            type: StringConstructor;
            reflect: boolean;
        };
        onChange: {
            type: FunctionConstructor;
            reflect: boolean;
        };
    } & {
        disabled: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        outline: {
            type: BooleanConstructor;
            reflect: boolean;
        };
    };
    constructor(props?: InputProps);
    willUpdate(changedProps: any): void;
    static get styles(): import("lit-element").CSSResult;
    render(): import("lit-html").TemplateResult<1>;
}
