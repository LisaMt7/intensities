import { LitElement } from 'lit';
import { GraphNode } from './Node';
import './Edge';
import './Node';
import { GraphEdge } from './Edge';
export declare type GraphWorkspaceProps = {
    graph?: {
        [x: string]: any;
    };
    plot?: Function[];
    onPlot?: Function;
    preprocess?: Function;
};
export declare class GraphWorkspace extends LitElement {
    static get styles(): import("lit").CSSResult;
    static get properties(): {
        updateCount: {
            type: NumberConstructor;
            reflect: boolean;
        };
    };
    graph: GraphWorkspaceProps['graph'];
    updateCount: number;
    context: {
        scale: number;
    };
    editing: HTMLElement | null;
    mouseDown: boolean;
    translation: {
        x: number;
        y: number;
    };
    relXParent?: number;
    relYParent?: number;
    element: HTMLDivElement;
    nodes: Map<string, GraphNode>;
    edges: Map<string, GraphEdge>;
    constructor(props?: GraphWorkspaceProps);
    set: (graph: any) => Promise<void>;
    updated(): void;
    resize: (nodes?: GraphNode[]) => void;
    triggerUpdate: () => void;
    resolveEdge: (info: any, rerender?: boolean) => Promise<GraphEdge>;
    autolayout: () => void;
    createUIFromGraph: () => any;
    render(): import("lit-html").TemplateResult<1>;
    _scale: (e: any) => void;
    _transform: () => void;
    _pan: (e: any) => void;
}
