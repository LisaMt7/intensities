import { LitElement } from 'lit';
export declare type FileProps = {
    accept?: string;
    onChange?: (ev: Event) => any;
    webkitdirectory?: boolean;
    directory?: boolean;
    multiple?: boolean;
};
export declare class File extends LitElement {
    onChange: FileProps['onChange'];
    accept: FileProps['accept'];
    webkitdirectory: FileProps['webkitdirectory'];
    directory: FileProps['directory'];
    multiple: FileProps['multiple'];
    static get styles(): import("lit").CSSResult;
    static get properties(): {
        accept: {
            type: StringConstructor;
            reflect: boolean;
        };
        onChange: {
            type: FunctionConstructor;
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
    };
    constructor(props?: FileProps);
    render(): import("lit-html").TemplateResult<1>;
}
