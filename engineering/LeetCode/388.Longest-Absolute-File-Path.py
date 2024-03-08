"""
https://leetcode.com/problems/longest-absolute-file-path/description/
ref: https://leetcode.com/problems/longest-absolute-file-path/solutions/86619/simple-python-solution/

Time complexity: O(n), n = len(input)
Space complexity: O(l), l = max folder num
"""
class Solution:
    def lengthLongestPath(self, input: str) -> int:
        max_len, path_len = 0, { 0: 0 }
        for line in input.splitlines():
            name = line.lstrip('\t')
            depth = len(line) - len(name)
            if '.' in name:
                max_len = max(max_len, path_len[depth] + len(name))
            else:
                path_len[depth + 1] = path_len[depth] + len(name) + 1
        return max_len