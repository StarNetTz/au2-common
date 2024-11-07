import { IContainer, Registration } from '@aurelia/kernel';
import { IWaiter, Waiter } from './waiter';
import { ILooper, Looper } from './looper';
import { ITimeProvider, TimeProvider } from './timeProvider';

export const StarnetCommonsPlugin = create();

function create() {
	return {
		register(container: IContainer): IContainer {
			return container.register(
				Registration.transient(IWaiter, Waiter),
				Registration.transient(ILooper, Looper),
				Registration.transient(ITimeProvider, TimeProvider)
			);
		}
	};
}