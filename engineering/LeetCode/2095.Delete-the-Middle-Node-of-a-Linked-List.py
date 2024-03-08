# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

"""
https://leetcode.com/problems/delete-the-middle-node-of-a-linked-list/description/

Time complexity: O(n/2), n = len(head)
Space complexity: O(1)
"""
class Solution:
    def deleteMiddle(self, head: Optional[ListNode]) -> Optional[ListNode]:
        if not head.next: return None

        slow, fast, pre_slow = head, head, None

        while fast and fast.next:
            fast = fast.next.next
            pre_slow = slow
            slow = slow.next
        
        pre_slow.next = slow.next
        return head
        