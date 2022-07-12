import { LitElement } from 'lit';
import { TimeSeries } from '../plots';
declare type keyType = string | number | symbol;
export declare type ObjectEditorProps = {
    target: {
        [x: string]: any;
    };
    header?: keyType;
    mode?: string;
    plot?: Function[];
    onPlot?: Function;
    preprocess?: Function;
};
export declare class ObjectEditor extends LitElement {
    static get styles(): import("lit").CSSResult;
    static get properties(): {
        keys: {
            type: ObjectConstructor;
            reflect: boolean;
        };
        plot: {
            type: ObjectConstructor;
            reflect: boolean;
        };
        header: {
            type: StringConstructor;
            reflect: boolean;
        };
        mode: {
            type: StringConstructor;
            reflect: boolean;
        };
        onPlot: {
            type: FunctionConstructor;
            reflect: boolean;
        };
        preprocess: {
            type: FunctionConstructor;
            reflect: boolean;
        };
    };
    target: ObjectEditorProps['target'];
    keys: (keyType)[];
    header: ObjectEditorProps['header'];
    history: any[];
    plot: ObjectEditorProps['plot'];
    onPlot: ObjectEditorProps['onPlot'];
    preprocess: ObjectEditorProps['preprocess'];
    mode: string;
    timeseries: TimeSeries;
    constructor(props?: ObjectEditorProps);
    getMode: (target: any, plot: any) => "plot" | "view";
    set: (target?: {}, plot?: boolean) => Promise<void>;
    checkToPlot: (key: any, o: any) => boolean;
    getActions: (key: keyType, o: any) => Promise<import("lit-html").TemplateResult<1>>;
    getElement: (key: keyType, o: any) => Promise<import("lit-html").TemplateResult<1>>;
    render(): import("lit-html/directive").DirectiveResult<typeof import("lit-html/directives/until.js").UntilDirective>;
}
export {};
