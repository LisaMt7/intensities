/// <reference types="offscreencanvas" />
import { LitElement } from 'lit';
export declare type SpectrogramProps = {
    max?: number;
    backgroundColor?: string;
    data?: any[];
};
export declare class Spectrogram extends LitElement {
    static get styles(): import("lit").CSSResult;
    static get properties(): {
        max: {
            type: NumberConstructor;
            reflect: boolean;
        };
        data: {
            type: ArrayConstructor;
            reflect: boolean;
        };
        backgroundColor: {
            type: StringConstructor;
            reflect: boolean;
        };
    };
    willUpdate(changedProps: any): void;
    max: SpectrogramProps['max'];
    canvas: HTMLCanvasElement;
    backgroundColor: SpectrogramProps['backgroundColor'];
    ctx: CanvasRenderingContext2D;
    offscreen: OffscreenCanvas;
    offscreenctx: OffscreenCanvasRenderingContext2D;
    reset: boolean;
    offset: boolean;
    colorScale: string[];
    data: any[];
    normalizeFactor: number;
    dynNormalize: boolean;
    constructor(props?: SpectrogramProps);
    init: () => void;
    updateData: (data: any) => void;
    onresize: () => void;
    draw: () => void;
    interpolateArray(data: any[], fitCount: number): any[];
    render(): HTMLCanvasElement;
}
