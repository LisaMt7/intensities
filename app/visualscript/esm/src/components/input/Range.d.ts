import { LitElement } from 'lit';
export declare type RangeProps = {
    label?: string;
    persist?: boolean;
    value?: number;
    min?: number;
    max?: number;
    onChange?: (ev: Event) => any;
    onInput?: (ev: Event) => any;
};
export declare class Range extends LitElement {
    label: RangeProps['label'];
    persist: RangeProps['persist'];
    value: RangeProps['value'];
    min: RangeProps['min'];
    max: RangeProps['max'];
    onChange: RangeProps['onChange'];
    onInput: RangeProps['onInput'];
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
    } & {
        min: {
            type: NumberConstructor;
            reflect: boolean;
        };
        max: {
            type: NumberConstructor;
            reflect: boolean;
        };
    };
    constructor(props?: RangeProps);
    willUpdate(changedProps: any): void;
    render(): import("lit-html").TemplateResult<1>;
}
