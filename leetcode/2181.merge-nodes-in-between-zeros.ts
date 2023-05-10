/*
 * @lc app=leetcode id=2181 lang=typescript
 *
 * [2181] Merge Nodes in Between Zeros
 */
import { ListNode } from './model';
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

/**
 * Time complexity: O(n)
 * Space complexity: O(n)
 */
function mergeNodes(head: ListNode | null): ListNode | null {
    const res: ListNode = new ListNode();
    let pointer = res;
    let cur = 0;
    while (!!head) {
        if (head.val !== 0) {
            cur += head.val;
        } else {
            if (cur !== 0) {
                pointer.next = new ListNode(cur);
                pointer = pointer.next;
                cur = 0;
            }
        }
        head = head.next;
    }

    return res.next;
};
// @lc code=end