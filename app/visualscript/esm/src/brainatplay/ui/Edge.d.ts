export class Edge {
    constructor(source: any, target: any, parent: any);
    uuid: string;
    parent: any;
    source: any;
    target: any;
    parentNode: any;
    element: HTMLDivElement;
    svg: {
        element: any;
        size: number;
        radius: number;
    };
    box: {
        xMin: any;
        xMax: number;
        yMin: any;
        yMax: number;
    };
    node: {};
    drag: {
        node: any;
        start: {
            x: number;
            y: number;
        };
        cursor: any;
    };
    types: string[];
    onstart: any[];
    init: () => Promise<any>;
    _activate: () => Promise<void>;
    deinit: () => void;
    update: (port?: any) => Promise<any>;
    animate: () => void;
    resizeElement: () => void;
    mouseAsTarget: (type: any, upCallback: any) => void;
    _createUI: () => void;
    _activateUI: () => Promise<any>;
    insert: () => Promise<any>;
    dragHandler: (event: any) => void;
    svgPoint: (element: any, x: any, y: any) => any;
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
    export: () => {
        source: {
            node: any;
            port: any;
        };
        target: {
            node: any;
            port: any;
        };
    };
}
