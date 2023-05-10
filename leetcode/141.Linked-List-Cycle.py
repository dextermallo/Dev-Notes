"""
https://leetcode.com/problems/linked-list-cycle/description/

Time complexity: O(n), n = len(head)
Space complexity: O(1)
"""
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, x):
#         self.val = x
#         self.next = None

class Solution:
    def hasCycle(self, head: Optional[ListNode]) -> bool:
        if head == None: return False
        fast, slow = head.next, head
        while fast and fast.next:
            if fast == slow: return True
            fast = fast.next.next
            slow = slow.next
        return False