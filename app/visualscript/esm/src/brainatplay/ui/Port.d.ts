export class Port {
    constructor(node: any, name: any, info?: {});
    meta: {};
    info: {};
    name: any;
    uuid: string;
    node: any;
    edges: {
        input: Map<any, any>;
        output: Map<any, any>;
    };
    latency: number[];
    label: any;
    ui: {
        label: HTMLDivElement;
        input: {};
        output: {};
        latency: HTMLDivElement;
        value: {
            code: any;
            editor: () => void;
        };
        self: {
            code: any;
            editor: () => void;
        };
        gui: {
            container: any;
            input: any;
        };
    };
    _createElements: () => void;
    connect(e: any): void;
    checkForUpdates(): void;
    init: (info?: {}) => void;
    onchange: any;
    value: any;
    output: {
        type: any;
    };
    deinit: () => void;
    addEdge: (side: any, edge: any) => void;
    removeEdge: (side: any, id: any) => void;
    set: (port?: Port, forceUpdate?: boolean) => Promise<any>;
    get: () => any;
    _copy(input: any): any;
    _onchange: (port: any) => Promise<any>;
    animate: (side: any) => void;
    update: (port: any) => Promise<void>;
    data: any;
    setLatency: (val: any) => void;
    getLatency: () => number;
    _updateGUI: () => void;
    _getColorfromMap: (pct: any, map: any) => string;
    _getTypeDict: (val: any) => {
        type: any;
    };
    getType: () => any;
    createEditor: (name: any, target: any, key: any, type: any) => void;
    createValueEditor: () => void;
    createSelfEditor: () => void;
    edit: (name?: string) => void;
    export: () => {};
}
