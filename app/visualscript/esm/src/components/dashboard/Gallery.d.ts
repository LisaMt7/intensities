import { LitElement } from 'lit';
import '../general/Search';
export declare type Thing = {
    name: string;
    author?: string;
    tags?: string[];
};
export declare type GalleryProps = {
    search?: boolean;
    things?: Thing[];
};
export declare class Gallery extends LitElement {
    things: GalleryProps['things'];
    search: GalleryProps['search'];
    static get styles(): import("lit").CSSResult;
    static get properties(): {};
    constructor(props?: GalleryProps);
    load: (thing: any, i: any) => import("lit-html").TemplateResult<1>;
    getThings: () => Thing[];
    render(): import("lit-html").TemplateResult<1>;
}
