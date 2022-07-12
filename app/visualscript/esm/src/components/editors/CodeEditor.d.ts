import { LitElement } from 'lit';
export declare type CodeEditorProps = {
    value?: string;
    onInput?: Function;
    onSave?: Function;
    onReset?: Function;
    onClose?: Function;
};
export declare class CodeEditor extends LitElement {
    static get styles(): import("lit").CSSResult;
    static get properties(): {
        value: {
            type: StringConstructor;
            reflect: boolean;
        };
    };
    div: HTMLDivElement;
    monaco: any;
    value: CodeEditorProps['value'];
    onInput: CodeEditorProps['onInput'];
    onSave: CodeEditorProps['onSave'];
    onReset: CodeEditorProps['onReset'];
    onClose: CodeEditorProps['onClose'];
    textArea: HTMLTextAreaElement;
    constructor(props?: CodeEditorProps);
    willUpdate(changedProps: any): void;
    updated: () => void;
    render(): HTMLDivElement;
}
