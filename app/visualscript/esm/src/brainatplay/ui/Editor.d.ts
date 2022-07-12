export default class Editor {
    constructor(graph: any, parent?: HTMLElement);
    files: {};
    filesidebar: {};
    container: HTMLDivElement;
    app: {
        projects: {};
        graphs: {};
        ui: {
            container: HTMLDivElement;
        };
        editor: Editor;
    };
    parentNode: HTMLElement;
    graph: any;
    shown: boolean;
    context: {
        scale: number;
    };
    searchOptions: any[];
    local: boolean;
    toggle: any;
    selectorToggle: Element;
    search: HTMLInputElement;
    state: StateManager;
    lastMouseEvent: {};
    editing: boolean;
    props: {
        id: string;
        projectContainer: any;
        projectDefaults: any;
        open: boolean;
    };
    elementTypesToUpdate: string[];
    mainPage: Element;
    editor: Element;
    viewer: Element;
    preview: Element;
    sidebar: Element;
    download: Element;
    reload: Element;
    exit: Element;
    defaultpreview: Element;
    portEditor: Element;
    edit: Element;
    delete: Element;
    init: () => Promise<void>;
    settings: any;
    setToggle: (toggle?: any) => void;
    insertProjects: () => Promise<void>;
    _createApp(settings: any): void;
    createViewTabs: () => void;
    removeGraph: (graph: any) => void;
    addGraph: (graph: any) => void;
    addCloseIcon(parent: any, callback: any): void;
    addTab(o: any, type: any, onOpen?: () => void, lock?: boolean): any;
    currentFile: any;
    toggleContextMenuEvent: (el: any) => void;
    nextNode: {
        position: {
            x: any;
            y: any;
        };
    };
    createSettingsEditor(target?: {}): void;
    _resizeDefaultProjects: () => void;
    toggleDisplay(on: any): void;
    removeEdge(e: any, ignoreManager?: boolean): void;
    animate(source: any, target: any, latencyArr: any): void;
    getColorfromMap: (pct: any, map: any) => string;
    animateLatency(node: any, port: any, latency: any): void;
    animateNode(node: any, type: any): void;
    animateEdge(source: any, target: any): void;
    createObjectEditor(toParse: any, key: any): {
        container: HTMLDivElement;
        input: HTMLDivElement | HTMLButtonElement | HTMLSelectElement | HTMLTextAreaElement;
    } | {
        container?: undefined;
        input?: undefined;
    };
    createFile(nodeInfo: any, name: any, graph: any): Promise<void>;
    createFileElement: (fileDict: any, initialize?: {}) => void;
    createView(id: string, className: any, content: any): HTMLDivElement;
    createPluginSearch: (container: any) => Promise<void>;
    selectorMenu: HTMLDivElement;
    matchOptions: () => void;
    addNodeOption(classInfo?: {
        name: string;
        label: string;
        class: any;
        category: any;
        types: any[];
    }): void;
    addDropdownFunctionality: (node: any) => void;
    responsive: () => void;
    deinit(): void;
}
import { StateManager } from "./StateManager";
