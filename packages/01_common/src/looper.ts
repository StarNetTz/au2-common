import { DI } from "@aurelia/kernel";

export const ILooper = DI.createInterface<ILooper>('ILooper');

export interface ILooper {
    stop(): void;
    start(callback: () => Promise<void>): Promise<void>;
}

export class Looper implements ILooper {

    isRunning = false;

    async start(callback: () => Promise<void>): Promise<void> {
        this.isRunning = true;
        while (this.isRunning) {
            await callback();
        }
    }

    stop(): void {
        this.isRunning = false;
    }
}