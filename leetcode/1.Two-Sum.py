"""
https://leetcode.com/problems/two-sum/submissions/816695184/

Time complexity: O(len(nums))
Space complexity: O(len(unique number of nums))
"""

class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        mp = {}

        for (idx, val) in enumerate(nums):
            mp.setdefault(val, [])
            mp[val].append(idx)

        for (idx, val) in enumerate(nums):
            if mp.get(target - val) is not None and len(mp.get(target - val)) > 0:
                if (target == val * 2):
                    if (len(mp[val]) > 1):
                        return mp.get(val)
                else:
                    return [idx] + mp.get(target - val)