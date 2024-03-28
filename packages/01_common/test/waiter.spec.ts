import { Waiter } from '../src/waiter';

describe('Waiter provider tests', function () {
    test('Should configure and wait', async function () {
        const w = new Waiter();
        w.configure(5);
       await w.wait();
    });
});