export class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val === undefined ? 0 : val);
        this.next = (next === undefined ? null : next);
    }
    static fromArray(val: number[]): ListNode {
        const head = new ListNode();
        let cur = head;
        for (const v of val) {
            cur.next = new ListNode(v);
            cur = cur.next;
        }
        return head.next;
    }
}