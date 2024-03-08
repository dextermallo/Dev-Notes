"""
https://leetcode.com/problems/boats-to-save-people/description/

Time complexity: O(nlogn), n = len(people)
Space complexity: O(1)
"""
class Solution:
    def numRescueBoats(self, people: List[int], limit: int) -> int:
        people.sort()
        res, l, r = 0, 0, len(people) - 1
        while l < r:
            if people[l] + people[r] <= limit: l += 1
            r -= 1
            res += 1
        return res + (1 if l == r else 0)