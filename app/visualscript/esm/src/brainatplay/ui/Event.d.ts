export class Event {
    eventState: any;
    events: Map<any, any>;
    subEvent(eventName: any, port: any): any;
    unsubEvent(eventName: any, sub: any): void;
    eventEmitter(eventName: any, port: any): {
        name: any;
        id: any;
        port: any;
        sub: any;
    };
    removeEmitter(eventName: any): void;
    emit(eventName: any, val: any): void;
    workerCallback: (msg: any) => void;
    export: () => Event;
}
