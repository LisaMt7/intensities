export class Manager {
    constructor(session: any);
    zip: any;
    session: any;
    folders: {
        app: any;
    };
    latest: string;
    script: HTMLScriptElement;
    libraries: {};
    classRegistries: {};
    serverResolved: boolean;
    publishURL: string;
    createDefaultHTML: (script: any) => string;
    init: () => Promise<void>;
    version: string;
    getLibraryVersion: (version?: string) => Promise<any>;
    getPlugins: (version: any) => {
        name: string;
        id: any;
        label: string;
    }[];
    addDefaultFiles(): void;
    initializeZip: () => void;
    generateZip(app: any, onsuccess?: () => void, onerror?: () => void): Promise<void>;
    addClass: (info: any) => any;
    loadFromFile(): Promise<any>;
    getFilesFromZip(zip: any): Promise<any>;
    _prettyPrint(string: any, indent?: string): any;
    appToFile(app: any): {
        name: any;
        filename: string;
        content: string;
        combined: string;
        classes: any[];
    };
    classToFile(cls: any): {
        filename: string;
        content: string;
        combined: string;
    };
    download(app: any, filename: any, onsuccess: any, onerror: any): Promise<void>;
    publish(app: any): Promise<void>;
    appToDataURL(app: any, onsuccess: any, onerror: any): Promise<any>;
    save(app: any, onsuccess: any, onerror: any): Promise<void>;
    getPublishedApps(): Promise<any>;
    list(): Promise<{
        local: any[];
        published: any[];
    }>;
    getFilesFromDataURL(url: any): Promise<any>;
    checkIfSaveable(node: any): boolean;
    getFilesFromDB(name: any): Promise<any>;
    load(files: any): Promise<any>;
}
