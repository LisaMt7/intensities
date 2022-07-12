import { LitElement } from 'lit';
declare global {
    interface Window {
        Plotly: any;
    }
}
export declare type SpectrogramProps = {
    max?: number;
    backgroundColor?: string;
    data?: any[];
    config?: {
        [x: string]: any;
    };
    colorscale?: 'Hot' | 'Cold' | 'YlGnBu' | 'YlOrRd' | 'RdBu' | 'Portland' | 'Picnic' | 'Jet' | 'Greys' | 'Greens' | 'Electric' | 'Earth' | 'Bluered' | 'Blackbody' | string[][];
    Plotly?: any;
};
export declare class Spectrogram extends LitElement {
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
    };
    static colorscales: string[];
    colorscale: SpectrogramProps['colorscale'];
    div: HTMLDivElement;
    data: any[];
    plotData: any[];
    layout: {
        [x: string]: any;
    };
    windowSize: number;
    binWidth: number;
    Plotly: SpectrogramProps['Plotly'];
    config: SpectrogramProps['config'];
    colorscales: string[];
    constructor(props?: SpectrogramProps);
    resize: () => void;
    transpose(a: any): any[];
    getConfig: () => {
        displaylogo: boolean;
        responsive: boolean;
    } & {
        [x: string]: any;
    };
    willUpdate(changedProps: any): void;
    render(): HTMLDivElement;
}
