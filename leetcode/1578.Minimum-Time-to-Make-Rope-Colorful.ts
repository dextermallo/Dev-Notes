
/**
 * https://leetcode.com/problems/minimum-time-to-make-rope-colorful/description/
 * 
 * Time complexity: O(n), n = length of colors
 * 
 * Space complexity: O(1)
 */
function minCost(colors: string, neededTime: number[]): number {
    let res = 0;

    /**
     * Consequently, only one balloon will be remained, therefore, we only need to keep the balloon which will
     * take most time to remove, and remove all the others, we can get the minimum of time 
     * needed to remove the balloon with same colors.
     */

    for (let i = 0; i < colors.length; ++i) {
        let j = i + 1;
        let max = neededTime[i];
        let sum = neededTime[i];
        while (j < colors.length && colors[i] === colors[j]) {
            max = Math.max(neededTime[j], max);
            sum += neededTime[j++];
        }

        if (j - i > 1) {
            res += sum - max;
        }

        i = j - 1;
    }

    return res;
};