/**
 * https://leetcode.com/problems/sort-list/description/
 * 
 * Ref: https://leetcode.com/problems/sort-list/solutions/1795126/c-merge-sort-2-pointer-easy-to-understand/
 * 
 * Time complexity: O(nlogn) by merge sort
 * 
 * Space complexity: O(1)
 */

class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}

function sortList(head: ListNode | null): ListNode | null {
    if (head === null || head.next === null) { return head; }

    let slow = head, fast = head, tmp = head;
    while (fast !== null && fast.next !== null) {
        tmp = slow;
        slow = slow.next!;
        fast = fast.next.next! ?? null;
    }

    // truncate the first half of the list
    tmp.next = null;

    return mergeList(sortList(head), sortList(slow));
};

function mergeList (l1: ListNode | null, l2: ListNode | null): ListNode | null {
    let res = new ListNode(0);
    let cur = res;

    while (l1 !== null && l2 !== null) {
        if (l1.val <= l2.val) {
            cur.next = l1;
            l1 = l1.next;
        } else {
            cur.next = l2;
            l2 = l2.next;
        }
        cur = cur.next;
    }

    if (l1 !== null) { cur.next = l1; }
    if (l2 !== null) { cur.next = l2; }

    return res.next;
}