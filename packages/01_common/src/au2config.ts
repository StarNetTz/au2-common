import { IHttpClient } from "@aurelia/fetch-client";
import { DI, newInstanceOf } from '@aurelia/kernel';

export const IAU2Config = DI.createInterface<IAU2Config>('IAU2Config');

export interface IAU2Config {
    config: string;
    getConfig(): void;
    getValue(key: string): string;
}

export class AU2Config implements IAU2Config {

    config: string;

    constructor(@newInstanceOf(IHttpClient) readonly http: IHttpClient) {
    }

    async getConfig() {
        const resp = await this.http.get('config/config.json');
        this.config = await resp.json();
    }

    getValue(key: string) {
        const splitKey = key.split('.');
        let currentObject = this.config;
    
        splitKey.forEach(key => {
          if (currentObject[key]) {
            currentObject = currentObject[key];
          } else {
            throw new Error('Key ' + key + ' not found');
          }
        });
        return currentObject;
    }
}