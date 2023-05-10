# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

"""
https://leetcode.com/problems/reverse-linked-list/description/

Time complexity: O(n), n = len(head)
Space complexity: O(1)
"""
class Solution:
    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        newHead = None
        while head:
            next = head.next
            head.next = newHead
            newHead = head
            head = next
        return newHead