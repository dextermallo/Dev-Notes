import { PriorityQueue } from './PriorityQueue';
const { performance } = require('perf_hooks');


describe('PriorityQueue/peek', () => {
    test('a non-empty queue should be able to peek the top value', async () => {
        const queue: PriorityQueue<number> = new PriorityQueue<number>();

        queue.push(1, 3);
        expect(queue.peek()).toEqual(1);

        queue.push(2, 0);
        expect(queue.peek()).toEqual(2);

        queue.push(5, 2);
        expect(queue.peek()).toEqual(2);

        queue.pop();
        expect(queue.peek()).toEqual(5);

        queue.pop();
        expect(queue.peek()).toEqual(1);
    });

    test('an empty queue should return null', async () => {
        const queue: PriorityQueue<number> = new PriorityQueue<number>();

        expect(queue.peek()).toEqual(null);

        queue.push(1, 0);
        queue.pop();
        expect(queue.peek()).toEqual(null);
    });
});

describe('PriorityQueue/isEmpty', () => {
    test('by given an empty queue, isEmpty() should be true', async () => {
        const queue: PriorityQueue<number> = new PriorityQueue<number>();

        expect(queue.isEmpty()).toBeTruthy();

        queue.push(1, 0);
        queue.push(2, 0);
        queue.push(3, 0);

        queue.pop();
        queue.pop();
        queue.pop();

        expect(queue.isEmpty()).toBeTruthy();
    });

    test('by given a non-empty queue, isEmpty() should be false', async () => {
        const queue: PriorityQueue<number> = new PriorityQueue<number>();
        queue.push(1, 0);

        expect(queue.isEmpty()).toBeFalsy();

        queue.push(2, 0);
        queue.push(3, 0);

        queue.pop();
        queue.pop();

        expect(queue.isEmpty()).toBeFalsy();
    });
});

describe('PriorityQueue/pop', () => {
    test('a non-empty queue is able to pop out the top value', async () => {
        const queue: PriorityQueue<number> = new PriorityQueue<number>();
        queue.push(1, 0);
        queue.push(2, 5);

        expect(queue.pop()).toEqual(1);

        queue.push(3, 4);
        queue.push(4, 3);

        expect(queue.pop()).toEqual(4);

        queue.push(7, 7);

        expect(queue.pop()).toEqual(3);

        expect(queue.pop()).toEqual(2);

        expect(queue.pop()).toEqual(7);
    });

    test('an empty queue should return null', async () => {
        const queue: PriorityQueue<number> = new PriorityQueue<number>();

        expect(queue.pop()).toEqual(null);

        queue.push(2 ** 32, 0);
        queue.pop();
        expect(queue.pop()).toEqual(null);
    });
});

describe('PriorityQueue/push', () => {
    test('push should store the data order by ascending priority', async () => {
        const queue: PriorityQueue<number> = new PriorityQueue<number>();
        queue.push(2, 2);
        queue.push(1, 1);
        queue.push(4, 4);
        queue.push(3, 3);
        queue.push(6, 6);
        queue.push(5, 5);

        expect(queue.pop()).toEqual(1);
        expect(queue.pop()).toEqual(2);
        expect(queue.pop()).toEqual(3);
        expect(queue.pop()).toEqual(4);
        expect(queue.pop()).toEqual(5);
        expect(queue.pop()).toEqual(6);
    });

    test('equal priority should be order by the ascending insert time', async () => {
        const queue: PriorityQueue<number> = new PriorityQueue<number>();
        queue.push(2, 0);
        queue.push(1, 0);
        queue.push(4, 0);
        queue.push(3, 0);
        queue.push(6, 0);
        queue.push(5, 0);

        expect(queue.pop()).toEqual(2);
        expect(queue.pop()).toEqual(1);
        expect(queue.pop()).toEqual(4);
        expect(queue.pop()).toEqual(3);
        expect(queue.pop()).toEqual(6);
        expect(queue.pop()).toEqual(5);
    });

    test('a queue should support at least 10K operation within 1000 ms', async () => {
        const queue: PriorityQueue<number> = new PriorityQueue<number>();
        const startTime = performance.now();


        for (let i = 0; i < 10000; ++i) {
            const randomPriority = Math.trunc(Math.random() * 100000);
            queue.push(i, randomPriority);
        }

        let cur = queue.head.next;
        let curPriority = cur.priority;

        while (!!cur) {
            expect(curPriority).toBeLessThanOrEqual(cur.priority);
            curPriority = cur.priority;
            cur = cur.next;
        }

        const endTime = performance.now();
        expect(endTime - startTime).toBeLessThanOrEqual(1000);
    });
});