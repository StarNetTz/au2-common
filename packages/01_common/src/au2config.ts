import { IHttpClient } from "@aurelia/fetch-client";
import { DI, newInstanceOf, IContainer, Registration, resolve } from '@aurelia/kernel';
import { AppTask } from 'aurelia';

export const IAU2Config = DI.createInterface<IAU2Config>('IAU2Config');

export interface IAU2Config {
  config: string;
  initialize(): void;
  getValue(key: string): string;
}

export class AU2Config implements IAU2Config {

  config: string;

  constructor(
    readonly http = resolve(newInstanceOf(IHttpClient)),
    readonly options = resolve(IAU2ConfigOptions),
  ) { }

  async initialize() {
    const resp = await this.http.get(this.options.path);
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

export const AU2ConfigConfiguration = createAureliaConfiguration({});

function createAureliaConfiguration(options?: Partial<IAU2ConfigOptions>) {
  return {
    register(container: IContainer): IContainer {
      const mergedOptions: Partial<IAU2ConfigOptions> = {
        ...DefaultAU2ConfigOptions,
        ...options
      };

      return container.register(
        Registration.instance(IAU2ConfigOptions, mergedOptions),
        Registration.singleton(IAU2Config, AU2Config),
        AppTask.creating(IAU2Config, async plugin => {
          await plugin.initialize();
        })
      );
    },
    configure(options?: Partial<IAU2ConfigOptions>) {
      return createAureliaConfiguration(options);
    }
  };
}

export interface IAU2ConfigOptions {
  path: string;
}

export const IAU2ConfigOptions = DI.createInterface<IAU2ConfigOptions>('IAU2ConfigOptions');

export const DefaultAU2ConfigOptions: IAU2ConfigOptions = {
  path: "config/config.json"
}