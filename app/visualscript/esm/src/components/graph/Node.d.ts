import { LitElement } from 'lit';
import { GraphWorkspace } from './Workspace';
import './Port';
import { GraphEdge } from './Edge';
import { GraphPort } from './Port';
export declare type GraphNodeProps = {
    workspace?: GraphWorkspace;
    x?: number;
    y?: number;
    info?: any;
};
export declare class GraphNode extends LitElement {
    static get styles(): import("lit").CSSResult;
    static get properties(): {
        x: {
            type: NumberConstructor;
            reflect: boolean;
        };
        y: {
            type: NumberConstructor;
            reflect: boolean;
        };
        keys: {
            type: ObjectConstructor;
            reflect: boolean;
        };
    };
    workspace: GraphNodeProps['workspace'];
    element: HTMLDivElement;
    x: GraphNodeProps['x'];
    y: GraphNodeProps['y'];
    info: GraphNodeProps['info'];
    edges: Map<string, GraphEdge>;
    ports: Map<string, GraphPort>;
    constructor(props?: GraphNodeProps);
    willUpdate: (updatedProps: any) => void;
    updated(changedProperties: any): void;
    setEdge: (edge: any) => Map<string, GraphEdge>;
    deleteEdge: (id: any) => boolean;
    addPort: (info: any) => void;
    render(): import("lit-html").TemplateResult<1>;
}
