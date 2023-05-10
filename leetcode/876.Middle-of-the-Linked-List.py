# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

"""
https://leetcode.com/problems/middle-of-the-linked-list/description/

Time complexity: O(n / 2), n = len(head) 
Space complexity: O(1)
"""
class Solution:
    def middleNode(self, head: Optional[ListNode]) -> Optional[ListNode]:
        newHead = ListNode(0, head)
        slow, fast = newHead, newHead

        while slow and fast:
            slow = slow.next
            fast = fast.next.next if fast.next else None

        return slow