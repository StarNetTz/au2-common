import { IContainer, Registration } from '@aurelia/kernel';
import { IWaiter, Waiter } from './waiter';
import { ILooper, Looper } from './looper';
import { ITimeProvider, TimeProvider } from './timeProvider';
import { AU2Config, IAU2Config } from 'au2config';

export const StarnetCommonsPlugin = create();

function create() {
	return {
		register(container: IContainer): IContainer {
			return container.register(
				Registration.transient(IWaiter, Waiter),
				Registration.transient(ILooper, Looper),
				Registration.transient(ITimeProvider, TimeProvider),
				Registration.singleton(IAU2Config, AU2Config)
			);
		}
	};
}