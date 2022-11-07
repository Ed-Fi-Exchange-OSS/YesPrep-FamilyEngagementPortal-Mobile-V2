import { InjectionToken } from '@angular/core';

export class AzureConfig {
    clientId: string;
    resource: string;
    tenantId: string;   
    redirectUri: string;
    instance: string;
}

export let AZURE_CONFIG = new InjectionToken<AzureConfig>('azure.config')