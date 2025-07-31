export {};

declare global {
    interface Window {
        initComponent(
            componentName: string,
            containerId: string,
            apiKey: string,
            options?: Record<string, any>
        ): void;
        tarteaucitron: any;
    }
}