import { DI } from "@aurelia/kernel";

export interface IWaiter {
    wait(): Promise<void>;
    configure(miliseconds: number): void;
}

export const IWaiter = DI.createInterface<IWaiter>('IWaiter');

export class Waiter implements IWaiter {

    period = 1000;
	
	constructor() {}

    wait(): Promise<void> {
        return new Promise((resolveOuter) => {
            resolveOuter(
                new Promise((resolveInner) => {
                    setTimeout(resolveInner, this.period);
                }),
            );
        });
    }

    configure(miliseconds: number): void {
        if (this.period !== miliseconds)
            this.period = miliseconds;
    }
}