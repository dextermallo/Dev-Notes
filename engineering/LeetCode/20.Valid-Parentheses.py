"""
https://leetcode.com/problems/valid-parentheses/description/

Time complexity: O(len(s))
Space complexity: O(len(s))

"""

mp = {
    ')': '(',
    ']': '[',
    '}': '{'
}

class Solution:
    def isValid(self, s: str) -> bool:
        arr = []

        for c in s:
            if c == '(' or c == '{' or c == '[':
                arr.append(c)
            else:
                if not arr or arr[-1] != mp.get(c):
                    return False
                else:
                    arr.pop()
        return len(arr) == 0