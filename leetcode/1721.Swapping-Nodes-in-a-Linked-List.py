# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next

"""
https://leetcode.com/problems/swapping-nodes-in-a-linked-list/description/
ref: https://leetcode.com/problems/swapping-nodes-in-a-linked-list/solutions/1009800/c-j-p3-one-pass

Time complexity: O(n), n = len(head)
Space complexity: O(1)
"""
class Solution:
    def swapNodes(self, head: Optional[ListNode], k: int) -> Optional[ListNode]:
        # 1, ..., p1, ..., p2, ... n
        # |-- k  -|        |-- k --|
        n1, n2, p = None, None, head
        while p is not None:
            k -= 1
            
            if n2 is not None: n2 = n2.next
            if k == 0: n1 = p; n2 = head
            p = p.next
            
        n1.val, n2.val = n2.val, n1.val
        return head