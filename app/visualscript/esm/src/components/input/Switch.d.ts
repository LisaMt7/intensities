import { LitElement } from 'lit';
export declare type SwitchProps = {
    label?: string;
    persist?: boolean;
    value?: boolean;
    onChange?: (ev: Event) => any;
};
export declare class Switch extends LitElement {
    label: SwitchProps['label'];
    persist: SwitchProps['persist'];
    value: SwitchProps['value'];
    onChange: SwitchProps['onChange'];
    static get styles(): import("lit").CSSResult;
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
    };
    constructor(props?: SwitchProps);
    willUpdate(changedProps: any): void;
    render(): import("lit-html").TemplateResult<1>;
}
