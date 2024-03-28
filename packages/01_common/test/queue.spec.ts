import { Queue } from '../src/queue';

describe('Queue tests', function () {
    test('Should use queue', async function () {
        const q = new Queue<number>();
        
        q.enqueue(1);
        expect(q.peek()).toBe(1);
        const v = q.dequeue();
        expect(v).toBe(1);
        expect(q.size()).toBe(0);
    });
});