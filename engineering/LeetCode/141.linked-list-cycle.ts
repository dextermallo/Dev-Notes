/*
 * @lc app=leetcode id=141 lang=typescript
 *
 * [141] Linked List Cycle
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

function hasCycle(head: ListNode | null): boolean {
    if (head === null || head.next === null) { return false; }

    let fast = head, slow = head.next;
    while (fast !== null && slow !== null && slow.next !== null) {
        fast = fast.next;
        slow = slow.next.next;

        if (fast === slow) { return true; }
    }

    return false;
};
// @lc code=end

