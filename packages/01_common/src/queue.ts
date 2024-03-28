export class Queue<T> {
    private elements: T[] = [];

    enqueue(element: T): void {
        this.elements.push(element);
    }

    dequeue(): T | undefined {
        return this.elements.shift();
    }

    isEmpty(): boolean {
        return this.elements.length === 0;
    }

    peek(): T | undefined
    {
        if (!this.isEmpty())
            return this.elements[0];
        else
            return undefined;
    }

    size(): number {
        return this.elements.length;
    }
}