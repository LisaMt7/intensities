export default class Graph {
    static _id: string;
    id: string;
    internal: Map<string, Graph>;
    external: {
        [x: string]: Graph;
    };
    parent: Graph | null;
    debug: boolean;
    value: any;
    constructor(transform?: Function | any, parent?: Graph, debug?: boolean);
    init: () => void;
    deinit: () => void;
    resize: () => void;
    transform: Function;
    get: (id: string) => Graph;
    set: (id?: string, target?: any) => Graph;
    delete: (id: string) => boolean;
    subscribe: (target?: Graph | Function) => any;
    unsubscribe: (id: string) => void;
    add: (graph: Graph) => void;
    remove: (id: string) => void;
    oninit: (self?: Graph) => void;
    ondeinit: (self?: Graph) => void;
    onconnect: (self?: Graph) => void;
    ondisconnect: (self?: Graph) => void;
    onresize: (self?: Graph) => void;
    push: (input: any) => Promise<void>;
    _onpush: (input: any) => void;
}
