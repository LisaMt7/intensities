export function sortObjectByValue(object: any): {};
export function sortObjectByPropName(object: any): {};
export class ObjectListener {
    constructor(debug?: boolean, synchronous?: boolean);
    debug: boolean;
    listeners: any[];
    synchronous: boolean;
    syncInterval: string;
    syncAnim: number;
    addListener(listenerKey: any, objectToListenTo: any, propToListenTo?: any, onchange?: any, interval?: any, debug?: boolean, startRunning?: boolean): void;
    getListener(key: any): any;
    hasKey(key: any): boolean;
    getKeyIndices(key: any): any[];
    onchange(key?: any, newCallback?: any): void;
    addFunc: (key?: any, newCallback?: any, start?: boolean) => any;
    getFuncs: (key?: any) => any;
    removeFuncs: (key?: any, idx?: any, stop?: boolean) => void;
    stop(key?: any): void;
    start(key?: any): void;
    startSync(): void;
    stopSync(): void;
    remove(key?: any): void;
}
export class ObjectListenerInstance {
    constructor(object: any, propName?: string, onchange?: (newData: any) => void, interval?: string, debug?: boolean, startRunning?: boolean);
    debug: boolean;
    onchange: (newData: any) => void;
    onchangeFuncs: any[];
    object: any;
    propName: string;
    propOld: any;
    running: boolean;
    funcs: number;
    interval: string | number;
    checker: number;
    addFunc: (onchange?: any) => number;
    removeFuncs(idx?: any): void;
    onchangeMulti: (newData: any) => void;
    setListenerRef: (propName: any) => void;
    check: () => boolean;
    start(): void;
    stop(): void;
}
