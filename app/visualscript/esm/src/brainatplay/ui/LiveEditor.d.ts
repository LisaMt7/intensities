export class LiveEditor {
    constructor(settings?: {
        language: string;
        shortcuts: {};
    }, parentNode?: HTMLElement);
    props: {
        id: number;
        language: string;
        supportedLanguages: string[];
        shortcuts: {};
        settings: {
            language: string;
            shortcuts: {};
        };
    };
    editorId: string;
    input: Element;
    parentNode: HTMLElement;
    quickrefhidden: boolean;
    init: () => void;
    container: HTMLDivElement;
    reset: Element;
    close: Element;
    submit: Element;
    editorContainer: Element;
    scrollElement: Element;
    text: Element;
    target: any;
    onKeyDown: (e: any) => void;
    reference: Element;
    toggle: Element;
    ui: DOMFragment;
    save: () => void;
    deinit: () => void;
    _setContent(): void;
    _updateSettings(settings: any): void;
    onSave: () => void;
    onInput: any;
    onOpen: () => void;
    onClose: () => void;
    key: any;
    head: any;
    body: any;
    copy: any;
    updateSettings(settings?: {}): void;
    getFunctionBody: (method: any) => any;
    getFunctionHead: (method: any) => any;
    insertGLSLReference: () => void;
    _replaceFunctionBody: (fnToReplace: any, newBody: any) => any;
    _updateDisplay: (text: any) => void;
    _syncScroll: (element: any) => void;
    _triggerCodeChange(): void;
    _checkTab: (element: any, event: any) => void;
}
import { DOMFragment } from "./DOMFragment";
