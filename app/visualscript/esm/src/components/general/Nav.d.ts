import { LitElement } from 'lit';
import { Button } from './Button';
declare type ElementType = {
    content: string;
    link?: string;
    external?: boolean;
    type?: string;
    id?: string;
    onClick?: () => {};
};
export declare type NavProps = {
    primary: {
        menu: ElementType[];
        options: ElementType[];
    };
    secondary: ElementType[];
    brand: Partial<ElementType>;
    color?: string;
};
export declare class Nav extends LitElement {
    static get styles(): import("lit").CSSResult;
    static get properties(): {
        primary: {
            type: ObjectConstructor;
        };
        secondary: {
            type: ArrayConstructor;
            reflect: boolean;
        };
        brand: {
            type: ObjectConstructor;
        };
        color: {
            type: StringConstructor;
            reflect: boolean;
        };
    };
    primary: NavProps['primary'];
    secondary: NavProps['secondary'];
    color: NavProps['color'];
    brand: NavProps['brand'];
    constructor(props?: NavProps);
    willUpdate(changedProps: any): void;
    stringToFunction: (value: any) => any;
    getElement: (o: ElementType) => Button | import("lit-html").TemplateResult<1>;
    render(): import("lit-html").TemplateResult<1>;
}
export {};
