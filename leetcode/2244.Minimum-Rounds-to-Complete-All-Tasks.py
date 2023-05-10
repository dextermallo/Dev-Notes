"""
https://leetcode.com/problems/minimum-rounds-to-complete-all-tasks/description/

Time complexity: O(n + u), n = len(tasks), u = num of unique task
Space complexity: O(u)
"""
class Solution:
    def minimumRounds(self, tasks: List[int]) -> int:
        mp, res = {}, 0

        for t in tasks: mp[t] = 1 if t not in mp else mp[t] + 1

        # a = 6n + left
        for key in mp:
            div, left = mp[key] // 6, mp[key] % 6
            if left == 1:
                if div == 0: return -1
                else:
                    res += 3
                    div -= 1

            res += div * 2
            if left == 2 or left == 3: res += 1
            elif left == 4 or left == 5: res += 2
        return res