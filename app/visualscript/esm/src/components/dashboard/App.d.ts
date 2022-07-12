import { Tab, TabProps } from './tabs/Tab';
export declare type AppProps = TabProps & {};
export declare class App extends Tab {
    name: AppProps['name'];
    parent: Node;
    static get styles(): import("lit").CSSResult;
    static get properties(): {
        name: {
            type: StringConstructor;
            reflect: boolean;
        };
        controls: {
            type: ArrayConstructor;
            reflect: boolean;
        };
        on: {
            type: FunctionConstructor;
            reflect: boolean;
        };
        type: {
            type: StringConstructor;
            reflect: boolean;
        };
        off: {
            type: FunctionConstructor;
            reflect: boolean;
        };
    };
    constructor(props?: AppProps);
    render(): import("lit-html").TemplateResult<1>;
}
