"""
https://leetcode.com/problems/find-target-indices-after-sorting-array/description/

Time complexity: O(n)

Space complexity: O(len(nums)), depends on how many target in the list
"""
class Solution:
    def targetIndices(self, nums: List[int], target: int) -> List[int]:
        cnt = 0; target_num = 0
        for n in nums:
            if n < target:
                cnt += 1
            elif n == target:
                target_num += 1

        return [*range(cnt, cnt + target_num)]