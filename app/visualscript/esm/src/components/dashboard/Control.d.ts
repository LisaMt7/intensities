import { LitElement } from 'lit';
import { ButtonProps } from '../general';
import { SelectProps, FileProps, RangeProps, SwitchProps, InputProps } from '../input';
export declare type ControlProps = {
    label?: string;
    type?: 'select' | 'button' | 'file' | string;
    persist?: boolean;
    park?: boolean;
} & SelectProps & ButtonProps & FileProps & SwitchProps & RangeProps & InputProps;
export declare class Control extends LitElement {
    element: HTMLElement;
    label: ControlProps['label'];
    type: ControlProps['type'];
    persist: ControlProps['persist'];
    park: ControlProps['park'];
    value: ControlProps['value'];
    options: ControlProps['options'];
    onChange: ControlProps['onChange'];
    accept: ControlProps['accept'];
    webkitdirectory: ControlProps['webkitdirectory'];
    directory: ControlProps['directory'];
    multiple: ControlProps['multiple'];
    onClick: ControlProps['onClick'];
    primary: ControlProps['primary'];
    backgroundColor: ControlProps['backgroundColor'];
    size: ControlProps['size'];
    static get styles(): import("lit").CSSResult;
    static get properties(): {
        label: {
            type: StringConstructor;
            reflect: boolean;
        };
        type: {
            type: StringConstructor;
            reflect: boolean;
        };
        persist: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        park: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        value: {
            type: ObjectConstructor;
            reflect: boolean;
        };
        options: {
            type: ObjectConstructor;
            reflect: boolean;
        };
        onChange: {
            type: ObjectConstructor;
            reflect: boolean;
        };
        accept: {
            type: StringConstructor;
            reflect: boolean;
        };
        webkitdirectory: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        directory: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        multiple: {
            type: BooleanConstructor;
            reflect: boolean;
        };
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
            type: ObjectConstructor;
            reflect: boolean;
        };
    };
    constructor(props?: ControlProps);
    getElement: () => void;
    render(): import("lit-html").TemplateResult<1>;
    willUpdate: (changedProps: any) => void;
    updated(changedProperties: any): void;
}
