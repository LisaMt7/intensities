import { LitElement } from 'lit';
export declare type SelectProps = {
    label?: string;
    persist?: boolean;
    options?: (string | Option)[];
    value?: Option['value'];
    onChange?: (ev: Event) => any;
};
export declare type Option = {
    text: string;
    value: string;
};
export declare class Select extends LitElement {
    label: SelectProps['label'];
    persist: SelectProps['persist'];
    optionChecked: String;
    optionHoveredIndex: number;
    options: SelectProps['options'];
    value: SelectProps['value'];
    onChange: SelectProps['onChange'];
    elements: {
        elSelectNative: HTMLSelectElement;
        elSelectCustom: HTMLElement;
        elSelectCustomOpts: HTMLElement;
        customOptsList: Element[];
    };
    optionsCount: number;
    static get styles(): import("lit").CSSResult;
    static get properties(): {
        options: {
            type: ArrayConstructor;
            reflect: boolean;
        };
    } & {
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
    add: (option: Option) => void;
    openSelectCustom: () => void;
    closeSelectCustom: () => void;
    constructor(props?: SelectProps);
    updateCustomSelectHovered: (newIndex: any) => void;
    updateCustomSelectChecked: (value: any, text?: any) => void;
    watchClickOutside: (e: any) => void;
    supportKeyboardNavigation: (e: any) => void;
    willUpdate(changedProps: any): void;
    updated(changedProperties: any): void;
    render(): import("lit-html").TemplateResult<1>;
}
