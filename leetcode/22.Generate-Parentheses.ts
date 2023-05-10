/**
 * https://leetcode.com/problems/generate-parentheses/description/
 * Ref: https://leetcode.com/problems/generate-parentheses/solutions/10100/easy-to-understand-java-backtracking-solution
 * 
 * Time complexity: O(2 ^ 2n)
 * since we need to iterate every possibilities for generating the nodes: 2 ^ 2n for both valid and invalid
 * we will emit the invalid group, therefore, 2 ^ 2n / 2
 * 
 * Space complexity: O(n)
 */
function generateParenthesis(n: number): string[] {
    const res: string[] = [];

    const helper = (open: number, close: number, s: string) => {
        if (s.length === n * 2) {
            res.push(s);
            return;
        }

        if (open < n) { helper(open + 1, close, s + '('); }
        if (close < open) { helper(open, close + 1, s + ')'); }
    }

    helper(0, 0, '');
    return res;
};