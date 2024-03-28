import { TimeProvider } from '../src/timeProvider';

describe('Time provider tests', function () {
    test('Should return number of miliseconds since the epoch', async function () {
        const tp = new TimeProvider();
        const now = tp.utcNow();
        expect(typeof(now)).toBe("number");
    });
});