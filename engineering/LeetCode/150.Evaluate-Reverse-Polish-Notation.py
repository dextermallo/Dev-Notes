from math import trunc

op = {
    '+': lambda x, y: x + y,
    '-': lambda x, y: x - y,
    '*': lambda x, y: x * y,
    '/': lambda x, y: trunc(x / y)
}

"""
https://leetcode.com/problems/evaluate-reverse-polish-notation/description/

Time complexity: O(n), n = len(tokens)
Space complexity: O(n)
"""
class Solution:
    def evalRPN(self, tokens: list[str]) -> int:
        res = []
        for t in tokens:
            if t.lstrip('-').isdigit():
                res.append(int(t))
            else:
                right, left = res.pop(), res.pop()
                res.append(op[t](left, right))

        return res[0]

sol = Solution()
print(sol.evalRPN(["10","6","9","3","+","-11","*","/","*","17","+","5","+"]))