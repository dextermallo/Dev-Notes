"""
https://leetcode.com/problems/merge-two-sorted-lists/description/

Time complexity: O(len(list1) + len(list2))

Space complexity: O(1)

"""


class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:
        if list1 == None:
            return list2
        if list2 == None:
            return list1
        
        if list1.val < list2.val:
            list1.next = self.mergeTwoLists(list2, list1.next)
            return list1
        else:
            list2.next = self.mergeTwoLists(list2.next, list1)
            return list2