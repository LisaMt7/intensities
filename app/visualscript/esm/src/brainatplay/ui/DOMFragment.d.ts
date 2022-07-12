export class DOMFragment {
    /**
     * @ignore
     * @constructor
     * @alias DOMFragment
     * @description Create a DOM fragment.
     * @param {function} templateStringGen - Function to generate template string (or template string itself, or Element)
     * @param {HTMLElement} parentNode HTML DOM node to append fragment into.
     * @param {callback} onRender Callback when element is rendered. Use to setup html logic via js
     * @param {callback} onchange Callback when element is changed.
     * @param {int} propUpdateInterval How often to update properties.
     * @param {callback} ondelete Called just before the node is deleted (e.g. to clean up animations)
     * @param {callback} onresize Called on window resize, leave undefined to not create resize events
     */
    constructor(templateStringGen?: Function, parentNode?: HTMLElement, props?: {}, onRender?: callback, onchange?: callback, propUpdateInterval?: int, ondelete?: callback, onresize?: callback);
    onRender: (props?: {}) => void;
    onchange: (props?: {}) => void;
    ondelete: (props?: {}) => void;
    onresize: any;
    parentNode: HTMLElement;
    renderSettings: {
        templateStringGen: Function;
        props: {};
    };
    props: {};
    templateString: any;
    node: any;
    listener: ObjectListener;
    appendFragment(toAppend: any, parentNode: any): any;
    isElement: (element: any) => boolean;
    deleteFragment(parentNode: any, nodeId: any): void;
    removeParent(elementId: any): void;
    renderNode(parentNode?: HTMLElement): void;
    setNodeResizing(): void;
    removeNodeResizing(): void;
    updateNode(parentNode?: HTMLElement, node?: any, props?: {}): void;
    deleteNode(node?: any): void;
    appendStylesheet(styles?: string, node?: any): void;
}
import { ObjectListener } from "./ObjectListener";
