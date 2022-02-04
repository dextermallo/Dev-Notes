/**
 * @description a Node is the minimum component of a priorityQueue
 * 
 * @example
 * ```ts
 * const node: Node<number> = new Node(1, 0);
 * ```
 */
class Node<T> {
    /**
     * @description queue storage
     */
    data: T;

    /**
     * @description the priority of the data
     */
    priority: number;

    /**
     * @description to specify a linkedList
     */
    next?: Node<T>;

    constructor(data: T, priority: number) {
        this.data = data;
        this.priority = priority;
        this.next = null;
    }
}

/**
 * @description implementation of PriorityQueue via linkedList. When a data is inserted,
 * it will automatically be order by: 
 * - (1) ascending priority
 * - (2) if two data have equal priority, the data which is earlier be inserted 
 * will in the front
 * 
 * 
 * Time complexity per operation:
 * 
 * - `peek()` - O(1)
 * - `isEmpty()` - O(1)
 * - `pop()` - O(1)
 * - `push()` - O(n)
 * 
 * @example
 * ```ts
 * 
 * // to create a PriorityQueue which stores number:
 * const queue: PriorityQueue<number> = new PriorityQueue<number>();
 * 
 * // push a number
 * queue.push(1, 0);
 * 
 * // peek the top value, return null if the queue is empty
 * queue.peek(); // 1
 * 
 * // check whether the queue is empty
 * queue.isEmpty(); // false
 * 
 * // pop out the top value, return null if the queue is empty
 * queue.pop() // 1
 * ```
 */
export class PriorityQueue<T> {

    /**
     * @description the linkedList to store the data of priorityQueue.
     */
    head: Node<T>;

    constructor() { this.head = new Node<T>(null, 0); }

    /**
     * @description to peek the top value
     * @returns null if the queue is empty, otherwise, return the top value
     */
    peek = (): T | null => !!this.head.next ? this.head.next.data : null;

    /**
     * @description to check whether the queue is empty
     * @returns true if the queue is empty
     */
    isEmpty = (): boolean => this.head.next === null;

    /**
     * @description pop out the top value
     * @returns null if the queue is empty, otherwise, return the top value
     */
    pop(): T | null {
        if (this.isEmpty()) { return null; }
        const tmp = this.head.next;
        this.head.next = tmp.next;
        return tmp.data;
    }

    /**
     * @description push a value into the queue
     * @param data - `required`. data which requires to store
     * @param priority - `required`. To specify the priority of the data
     */
    push(data: T, priority: number) {
        const appendNode = new Node<T>(data, priority);

        if (this.isEmpty()) {
            this.head.next = appendNode;
            return;
        }

        let cur = this.head.next;
        let prev = this.head;

        while (!!cur) {
            if (cur.priority > priority) {
                appendNode.next = cur;
                prev.next = appendNode;
                return;
            }
            prev = cur;
            cur = cur.next;
        }

        prev.next = appendNode;
    }
}