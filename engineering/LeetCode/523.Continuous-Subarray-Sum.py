"""
https://leetcode.com/problems/continuous-subarray-sum/solutions/

Ref: https://leetcode.com/problems/continuous-subarray-sum/solutions/99499/java-o-n-time-o-k-space/?orderBy=most_votes

Time complexity: O(n)
Space complexity: O(k)
"""

class Solution:
    def checkSubarraySum(self, nums: List[int], k: int) -> bool:
        mp, cur_sum = { 0: -1 }, 0

        for i in range(len(nums)):
            cur_sum = (nums[i] + cur_sum) % k
            prev = None if cur_sum not in mp else mp[cur_sum]
            if prev is not None:
                if i - prev > 1:
                    return True
            else:
                mp[cur_sum] = i

        return False