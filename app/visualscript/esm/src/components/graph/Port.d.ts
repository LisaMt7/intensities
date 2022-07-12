import { LitElement } from 'lit';
import { GraphNode } from './Node';
import { GraphEdge } from './Edge';
export declare type GraphPortProps = {
    tag?: string;
    node?: GraphNode;
};
export declare class GraphPort extends LitElement {
    static get styles(): import("lit").CSSResult;
    static get properties(): {
        tag: {
            type: StringConstructor;
            reflect: boolean;
        };
        keys: {
            type: ObjectConstructor;
            reflect: boolean;
        };
    };
    node: GraphPortProps['node'];
    tag: GraphPortProps['tag'];
    element: HTMLDivElement;
    output: HTMLDivElement;
    input: HTMLDivElement;
    resolving: boolean;
    edges: Map<string, GraphEdge>;
    constructor(props?: GraphPortProps);
    updated(changedProperties: any): void;
    setEdge: (edge: any) => void;
    deleteEdge: (id: any) => void;
    resolveEdge: (ev: any) => Promise<void>;
    onmousedown: (ev: any) => Promise<void>;
    onmouseup: (ev: any) => void;
    render(): import("lit-html").TemplateResult<1>;
}
