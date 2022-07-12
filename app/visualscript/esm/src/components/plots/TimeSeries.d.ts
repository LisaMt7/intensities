import { LitElement } from 'lit';
export declare type TimeSeriesProps = {
    max?: number;
    backgroundColor?: string;
    data?: {
        y: any[];
        [x: string]: any;
    }[];
    layout?: {
        [x: string]: any;
    };
    config?: {
        [x: string]: any;
    };
    colorscale?: 'Hot' | 'Cold' | 'YlGnBu' | 'YlOrRd' | 'RdBu' | 'Portland' | 'Picnic' | 'Jet' | 'Greys' | 'Greens' | 'Electric' | 'Earth' | 'Bluered' | 'Blackbody' | string[][];
    Plotly?: any;
    onClick?: Function;
    onLegendClick?: Function;
};
export declare class TimeSeries extends LitElement {
    static get styles(): import("lit").CSSResult;
    createRenderRoot(): this;
    static get properties(): {
        max: {
            type: NumberConstructor;
            reflect: boolean;
        };
        data: {
            type: ArrayConstructor;
            reflect: boolean;
        };
        layout: {
            type: ObjectConstructor;
            reflect: boolean;
        };
        config: {
            type: ObjectConstructor;
            reflect: boolean;
        };
        colorscale: {
            type: ObjectConstructor;
            reflect: boolean;
        };
        backgroundColor: {
            type: StringConstructor;
            reflect: boolean;
        };
        onLegendClick: {
            type: FunctionConstructor;
            reflect: boolean;
        };
        onClick: {
            type: FunctionConstructor;
            reflect: boolean;
        };
    };
    static colorscales: string[];
    colorscale: TimeSeriesProps['colorscale'];
    div: any;
    data: TimeSeriesProps['data'];
    plotData: any[];
    layout: TimeSeriesProps['layout'];
    windowSize: number;
    binWidth: number;
    Plotly: TimeSeriesProps['Plotly'];
    onClick: TimeSeriesProps['onClick'];
    onLegendClick: TimeSeriesProps['onLegendClick'];
    colorscales: string[];
    config: TimeSeriesProps['config'];
    constructor(props?: TimeSeriesProps);
    getTraces: () => ({
        type: string;
        mode: string;
    } & {
        [x: string]: any;
        y: any[];
    })[];
    getConfig: () => {
        displaylogo: boolean;
        responsive: boolean;
    } & {
        [x: string]: any;
    };
    getLayout: () => {
        [x: string]: any;
    };
    transpose(a: any): any[];
    willUpdate(changedProps: any): void;
    render(): any;
}
