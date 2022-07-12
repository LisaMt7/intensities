import { LitElement } from 'lit';
import { GraphPort } from './Port';
import { GraphWorkspace } from './Workspace';
export declare type IOTypes = 'input' | 'output';
export declare type IOType = {
    output?: GraphPort;
    input?: GraphPort;
};
export declare type GraphEdgeProps = {
    workspace?: GraphWorkspace;
} & IOType;
export declare class GraphEdge extends LitElement {
    static get styles(): import("lit").CSSResult;
    static get properties(): {
        keys: {
            type: ObjectConstructor;
            reflect: boolean;
        };
    };
    output: GraphEdgeProps['output'];
    input: GraphEdgeProps['input'];
    element: SVGGraphicsElement;
    node: {
        p1: SVGCircleElement;
        p2: SVGCircleElement;
        c1: SVGCircleElement;
        c2: SVGCircleElement;
        c3: SVGCircleElement;
        l1: SVGLineElement;
        l2: SVGLineElement;
        curve: SVGPathElement;
    };
    box: {
        xMin: number;
        yMin: number;
        xMax: number;
        yMax: number;
    };
    svgInfo: {
        size: number;
        radius: number;
    };
    drag?: {
        node: HTMLElement;
        start: {
            x: number;
            y: number;
        };
        cursor: DOMPoint;
    };
    workspace: GraphWorkspace;
    toResolve: {
        type: IOTypes;
        callback: Function;
    };
    firstUp?: boolean;
    ready: Promise<boolean>;
    resolveReady?: {
        resolve: Function;
        reject: Function;
    };
    constructor(props?: GraphEdgeProps);
    link: (info: IOType) => boolean;
    getOtherType: (type: IOTypes) => "input" | "output";
    updated: () => Promise<void>;
    render(): import("lit-html").TemplateResult<1>;
    getEdgeName: ({ input, output }?: IOType) => string;
    resolveIO: (el: HTMLElement, typeNeeded: IOTypes, callback: Function, origin?: any) => boolean;
    mouseAsTarget: (type: any, upCallback: any) => void;
    init: () => Promise<unknown>;
    insert: () => Promise<unknown>;
    _activate: () => Promise<void>;
    dragHandler: (event: any) => void;
    svgPoint: (svg: any, x: any, y: any) => DOMPoint;
    updateElement: (element: any, attr: any) => void;
    getControlPoint: (circle: any) => {
        x: number;
        y: number;
    };
    updateControlPoints: (p1: any, p2: any) => void;
    drawCurve: () => void;
    addReactivity: () => void;
    _onMouseOverEdge: () => void;
    _onMouseOutEdge: () => void;
    _onClickEdge: () => void;
    deinit: () => void;
    resize: () => void;
}
