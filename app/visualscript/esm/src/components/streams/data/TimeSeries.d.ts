import { LitElement } from 'lit';
import { WebglLinePlotUtils } from '../../../../libraries/webglplotutil/webgl-plot-utils.js';
export declare type TimeSeriesProps = {
    data?: any[][];
    volume?: number;
    backgroundColor?: string;
    sps: number;
    seconds: number;
};
export declare class TimeSeries extends LitElement {
    static get styles(): import("lit").CSSResult;
    static get properties(): {
        data: {
            type: ArrayConstructor;
            reflect: boolean;
        };
        sps: {
            type: NumberConstructor;
            reflect: boolean;
        };
        seconds: {
            type: NumberConstructor;
            reflect: boolean;
        };
        backgroundColor: {
            type: StringConstructor;
            reflect: boolean;
        };
    };
    canvas: HTMLCanvasElement;
    util: WebglLinePlotUtils;
    data: any[][];
    spss: number[];
    buffers: any[];
    sps: TimeSeriesProps['sps'];
    seconds: TimeSeriesProps['seconds'];
    backgroundColor: TimeSeriesProps['backgroundColor'];
    constructor(props?: TimeSeriesProps);
    willUpdate(updatedProps: any): void;
    updateData: (data: any) => void;
    init: () => void;
    clear: () => void;
    draw: () => void;
    render(): HTMLCanvasElement;
}
