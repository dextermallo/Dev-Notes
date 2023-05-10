class Item:
    def __init__(self, val: int, last_min: int):
        self.val = val
        self.last_min = last_min

"""
https://leetcode.com/problems/min-stack/description/

Time complexity: all O(1)
Space complexity: O(n)
"""
class MinStack:

    stk: List[Item]

    def __init__(self):
        self.stk = []

    def push(self, val: int) -> None:
        self.stk.append(Item(val, val if len(self.stk) == 0 else min(self.stk[-1].last_min, val)))

    def pop(self) -> None:
        self.stk.pop()

    def top(self) -> int:
        return self.stk[-1].val

    def getMin(self) -> int:
        return self.stk[-1].last_min