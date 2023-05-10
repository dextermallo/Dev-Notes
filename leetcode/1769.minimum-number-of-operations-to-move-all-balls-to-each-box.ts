/*
 * @lc app=leetcode id=1769 lang=typescript
 *
 * [1769] Minimum Number of Operations to Move All Balls to Each Box
 */

// @lc code=start
/**
 * Time complexity: O(n)
 * Space complexity: O(n)
 * @see https://leetcode.com/problems/minimum-number-of-operations-to-move-all-balls-to-each-box/discuss/1075474/C%2B%2BJava-O(n)-LTR-%2B-RTL
 */
function minOperations(boxes: string): number[] {
    let res: number[] = new Array<number>(boxes.length).fill(0);
    let cnt = 0, ops = 0;

    for (let i = 0; i < boxes.length; ++i) {
       res[i] += ops;
       cnt += boxes[i] === '1' ? 1 : 0;
       ops += cnt; 
    }

    ops = 0, cnt = 0;
    for (let i = boxes.length - 1; i > -1; --i) {
        res[i] += ops;
        cnt += boxes[i] === '1' ? 1 : 0;
        ops += cnt;
    }

    return res;
};
// @lc code=end