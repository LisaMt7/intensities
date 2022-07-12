import { LitElement } from 'lit';
import { Modal } from './Modal';
import '../input/Input';
import './Button';
declare type Item = {
    name: string;
    tags: string[];
};
export declare type SearchProps = {
    placeholder?: string;
    items?: Item[];
};
export declare class Search extends LitElement {
    modal: Modal;
    items: SearchProps['items'];
    value: string;
    static get styles(): import("lit").CSSResult;
    static get properties(): {
        placeholder: {
            type: StringConstructor;
        };
        items: {
            type: ObjectConstructor;
        };
        value: {
            type: StringConstructor;
            reflect: boolean;
        };
    };
    constructor(props?: SearchProps);
    getModal: () => Modal;
    render(): import("lit-html").TemplateResult<1>;
}
export {};
