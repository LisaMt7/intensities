import { LitElement } from 'lit';
export declare type LoaderProps = {
    progress?: number;
    text?: string;
    color?: string;
    background?: string;
    textBackground?: string;
    textColor?: string;
    type?: 'default' | 'linear';
    showPercent?: boolean;
    size?: string;
};
export declare class Loader extends LitElement {
    static get styles(): import("lit").CSSResult;
    static get properties(): {
        progress: {
            type: NumberConstructor;
            reflect: boolean;
        };
        text: {
            type: StringConstructor;
            reflect: boolean;
        };
        type: {
            type: StringConstructor;
            reflect: boolean;
        };
        color: {
            type: StringConstructor;
            reflect: boolean;
        };
        background: {
            type: StringConstructor;
            reflect: boolean;
        };
        textBackground: {
            type: StringConstructor;
            reflect: boolean;
        };
        textColor: {
            type: StringConstructor;
            reflect: boolean;
        };
        size: {
            type: StringConstructor;
            reflect: boolean;
        };
    };
    progress: LoaderProps['progress'];
    color: LoaderProps['color'];
    background: LoaderProps['background'];
    type: LoaderProps['type'];
    showPercent: LoaderProps['showPercent'];
    text: LoaderProps['text'];
    textColor: LoaderProps['textColor'];
    textBackground: LoaderProps['textBackground'];
    size: LoaderProps['size'];
    constructor(props?: LoaderProps);
    willUpdate(_: any): void;
    render(): import("lit-html").TemplateResult<1>;
}
