export class Graph {
    static id: string;
    constructor(info: any, parent: any, edit?: boolean);
    nodes: Map<any, any>;
    edges: Map<any, any>;
    events: Map<any, any>;
    graphs: any[];
    ports: {};
    info: any;
    params: {};
    parent: any;
    app: any;
    props: {};
    uuid: string;
    position: {
        x: number;
        y: number;
        z: number;
    };
    name: any;
    className: any;
    analysis: Set<any>;
    ui: {
        element: () => any;
        code: () => any;
        codeEditor: () => any;
        graph: () => any;
        context: {
            scale: number;
        };
        editing: boolean;
        mouseDown: boolean;
        translation: {
            x: number;
            y: number;
        };
        relXParent: any;
        relYParent: any;
    };
    init: () => Promise<void>;
    deinit: () => void;
    configure: () => void;
    _scale: (e: any) => void;
    _transform: () => void;
    _pan: (e: any) => void;
    _random: () => string;
    _mergeInfo: (info?: {}) => void;
    _resizeUI: () => void;
    _init: () => void;
    addGraph: (g: any, edit?: boolean) => Promise<void>;
    addNode: (o: any) => Promise<any>;
    removeNode: (o: any) => void;
    updateParams: (params: any) => void;
    extend: (ChildClass: any, ParentClass: any, constructor?: (_super: any, args: any) => void) => any;
    addEdge: ({ source, target }: {
        source?: {
            node: any;
            port: any;
        };
        target?: {
            node: any;
            port: any;
        };
    }) => Promise<void>;
    removeEdge: (e: any) => void;
    convertToStandardEdge: (source: any, target: any) => {
        source: {};
        target: {};
    };
    addEvent: (ev: any) => Promise<void>;
    removeEvent: (ev: any) => void;
    addPort: (name: any, info: any) => Promise<void>;
    removePort: (query: any) => void;
    update: (port: any, user: any) => any;
    updateAll: () => void;
    requestNode: (nodeType: any) => Promise<any>;
    requestEdge: (sourceNode: any, sourcePort: any, targetPort: any) => Promise<void>;
    get: (query: any, val: any, pool?: any) => any;
    getGraph: (val: any) => any;
    getNode: (val: any) => any;
    getPort: (name: any) => any;
    getEdge: () => void;
    _createElement: () => any;
    _createGraphUI: () => any;
    _addPortElement: (p: any) => void;
    resizeAllNodes: () => void;
    resizeAllEdges: () => void;
    resizeElement: () => void;
    _createCodeUI: () => any;
    _createCodeEditor: () => any;
    class: any;
    save: () => void;
    insertNode: (node: any) => void;
    _nodesToGrid: () => void;
    _mapPositionFromScale: (position: any, rect: any) => any;
    addNodeEvents: (node: any) => void;
    debug: (parentNode?: HTMLElement) => void;
    export: () => {
        name: any;
        class: any;
    };
}
