import { AppTask } from "aurelia";
import { IContainer, Registration } from '@aurelia/kernel';
import { IAU2Config, AU2Config } from './au2config';
import { IWaiter, Waiter } from './waiter';
import { ILooper, Looper } from './looper';
import { ITimeProvider, TimeProvider } from './timeProvider';

export const StarnetCommonsPlugin = create();

function create() {
	return {
		register(container: IContainer): IContainer {
			return container.register(
				Registration.singleton(IAU2Config, AU2Config),
				Registration.transient(IWaiter, Waiter),
				Registration.transient(ILooper, Looper),
				Registration.transient(ITimeProvider, TimeProvider),
				AppTask.hydrating(IContainer, async container => {
					const cfg = container.get(IAU2Config);
					await cfg.getConfig();
				})
			);
		}
	};
}