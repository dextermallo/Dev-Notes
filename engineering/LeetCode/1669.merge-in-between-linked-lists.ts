/*
 * @lc app=leetcode id=1669 lang=typescript
 *
 * [1669] Merge In Between Linked Lists
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

function mergeInBetween(list1: ListNode | null, a: number, b: number, list2: ListNode | null): ListNode | null {
    let start: ListNode = list1;
    let cnt = 1;

    while (cnt < a) {
        start = start.next;
        ++cnt;
    }

    let end: ListNode = start;

    while (cnt <= b) {
        end = end.next;
        ++cnt;
    }

    start.next = list2;

    let list2_end = list2;

    while (list2_end.next !== null) {
        list2_end = list2_end.next;
    }

    list2_end.next = end.next;

    return list1;
};
// @lc code=end

