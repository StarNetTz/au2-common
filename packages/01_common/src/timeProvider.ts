import { DI } from "@aurelia/kernel";

export interface ITimeProvider {
  utcNow(): number;
}

export const ITimeProvider = DI.createInterface<ITimeProvider>('ITimeProvider');

export class TimeProvider implements ITimeProvider {
  utcNow(): number {
    return Date.now();
  }
}