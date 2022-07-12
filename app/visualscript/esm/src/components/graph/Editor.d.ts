import { LitElement } from 'lit';
import './Workspace';
import { GraphWorkspace } from './Workspace';
declare type keyType = string | number | symbol;
export declare type GraphEditorProps = {
    graph?: {
        [x: string]: any;
    };
    plot?: Function[];
    onPlot?: Function;
    preprocess?: Function;
};
export declare class GraphEditor extends LitElement {
    static get styles(): import("lit").CSSResult;
    static get properties(): {
        keys: {
            type: ObjectConstructor;
            reflect: boolean;
        };
    };
    graph: GraphEditorProps['graph'];
    keys: (keyType)[];
    history: any[];
    workspace: GraphWorkspace;
    constructor(props?: GraphEditorProps);
    set: (graph: any) => Promise<void>;
    getElement: (key: keyType, o: any) => Promise<import("lit-html").TemplateResult<1>>;
    render(): import("lit-html").TemplateResult<1>;
}
export {};
