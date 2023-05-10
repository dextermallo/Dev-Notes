# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

"""
https://leetcode.com/problems/partition-list/description/

Time complexity: O(n), n = len(head)
Space complexity: O(n)
"""
class Solution:
    def partition(self, head: Optional[ListNode], x: int) -> Optional[ListNode]:
        left, right = ListNode(0), ListNode(0)
        cur_left, cur_right = left, right
        while head:
            if head.val < x:
                cur_left.next = ListNode(head.val)
                cur_left = cur_left.next
            else:
                cur_right.next = ListNode(head.val)
                cur_right = cur_right.next
            head = head.next
        cur_left.next = right.next
        return left.next        