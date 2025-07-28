// src/global.d.ts
export {};

declare global {
  interface Window {
    /**
     * Injecté par le script Sportigo standalone.
     * @param componentName "Appointment" ou "AppointmentFull"
     * @param containerId id du <div> cible
     * @param apiKey ta clé Sportigo
     * @param options configuration { colored?: boolean, readonly?: boolean, dev?: boolean, ... }
     */
    initComponent(
      componentName: string,
      containerId: string,
      apiKey: string,
      options?: Record<string, any>
    ): void;
  }
}
