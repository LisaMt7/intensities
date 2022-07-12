export class StateManager {
    constructor(init?: {}, interval?: string, defaultKeyEventLoop?: boolean);
    data: {};
    interval: string;
    pushToState: {};
    pushRecord: {
        pushed: any[];
    };
    pushCallbacks: {};
    triggers: {};
    listener: ObjectListener;
    defaultStartListenerEventLoop: boolean;
    setInterval(interval?: string): void;
    updateState(key: any, value: any): void;
    removeState(key: any, sequential?: boolean): void;
    setupSynchronousUpdates: () => void;
    addToState(key: any, value: any, onchange?: any, startRunning?: boolean, debug?: boolean): any;
    getState(): any;
    setState(updateObj?: {}, appendArrs?: boolean): {};
    subscribeTrigger(key?: any, onchange?: (value: any) => void): number;
    unsubscribeTrigger(key?: any, sub?: number): void;
    unsubscribeAllTriggers(key: any): void;
    setSequentialState(updateObj?: {}): void;
    subscribeSequential(key?: any, onchange?: any): number;
    unsubscribeSequential(key?: any, sub?: number): void;
    unsubscribeAllSequential(key: any): void;
    setPrimaryKeyResponse(key?: any, onchange?: any, debug?: boolean, startRunning?: boolean): void;
    addSecondaryKeyResponse(key?: any, onchange?: any, debug?: boolean, startRunning?: boolean): any;
    removeSecondaryKeyResponse(key?: any, responseIdx?: any, stopIfEmpty?: boolean): void;
    clearAllKeyResponses(key?: any): void;
    getKeySubCallbacks(key: any): any;
    subscribe(key: any, onchange: any, startRunning?: boolean): any;
    unsubscribe(key: any, responseIdx?: any): void;
    unsubscribeAll(key: any): void;
    runSynchronousListeners(): void;
    stop(key?: any): void;
}
import { ObjectListener } from "./ObjectListener";
