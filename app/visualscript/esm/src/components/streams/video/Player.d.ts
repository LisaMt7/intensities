import { LitElement } from 'lit';
export declare type PlayerProps = {
    source?: MediaStream;
    autoplay?: boolean;
    controls?: boolean;
};
export declare class Player extends LitElement {
    static get styles(): import("lit").CSSResult;
    static get properties(): {
        source: {
            converter: {
                toAttribute(value: any): any;
                fromAttribute(value: any): any;
            };
        };
        autoplay: {
            type: BooleanConstructor;
        };
        controls: {
            type: BooleanConstructor;
        };
    };
    source?: MediaStream;
    autoplay?: boolean;
    controls?: boolean;
    constructor(props?: PlayerProps);
    willUpdate(_: any): void;
    render(): HTMLVideoElement;
}
