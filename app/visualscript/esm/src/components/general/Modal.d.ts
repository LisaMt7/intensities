import { LitElement } from 'lit';
import './Button';
export interface ModalProps {
    open?: boolean;
    header?: string;
    footer?: string;
    /**
     * What background color to use
     */
    backgroundColor?: string;
    /**
     * How large should the button be?
     */
    size?: 'small' | 'medium' | 'large';
    /**
     * Optional click handler
     */
    onClick?: () => void;
}
export declare class Modal extends LitElement {
    static get styles(): import("lit").CSSResult;
    static get properties(): {
        open: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        header: {
            type: ObjectConstructor;
            reflect: boolean;
        };
        footer: {
            type: StringConstructor;
            reflect: boolean;
        };
    };
    open: ModalProps['open'];
    header: ModalProps['header'];
    footer: ModalProps['footer'];
    backgroundColor: ModalProps['backgroundColor'];
    size: ModalProps['size'];
    constructor(props?: ModalProps);
    willUpdate(_: any): void;
    toggle: () => boolean;
    render(): import("lit-html").TemplateResult<1>;
}
