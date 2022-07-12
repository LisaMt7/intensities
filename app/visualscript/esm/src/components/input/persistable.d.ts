export declare const PersistableProps: {
    label: {
        type: StringConstructor;
        reflect: boolean;
    };
    persist: {
        type: BooleanConstructor;
        reflect: boolean;
    };
    value: {
        type: StringConstructor;
        reflect: boolean;
    };
    onChange: {
        type: FunctionConstructor;
        reflect: boolean;
    };
};
export declare const setPersistent: (o: any) => void;
export declare const getPersistent: (props: any) => any;
