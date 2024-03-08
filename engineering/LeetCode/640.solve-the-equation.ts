/*
 * @lc app=leetcode id=640 lang=typescript
 *
 * [640] Solve the Equation
 */

// @lc code=start

/**
 * time complexity: O(n)
 * space complexity: O(1)
 * 
 * the inner func `transformToVal()` can be optimized by regex,
 * @see https://leetcode.com/problems/solve-the-equation/discuss/105311/Concise-Java-Solution
 */
type Val = { x: number, num: number };
const NO_SOLUTION_MSG = 'No solution';
const INFINITE_SOLUTION_MSG = 'Infinite solutions';

function solveEquation(equation: string): string {
    const transformToVal = (s: string): Val => {
        let res: Val = { x: 0, num: 0 };
        
        let isPositive = true;
        let num = 0;
        let isX = false;

        const update = () => {
            if (num === 0 && isX) { res.x += isPositive ? 1 : -1; }
            if (num !== 0) { res[isX ? 'x' : 'num'] += isPositive ? num : -num; }
            num = 0;
            isX = false;
        };

        for (let i = 0; i < s.length; ++i) {
            switch (s[i]) {
                case '+':
                    update();
                    isPositive = true;
                    break;
                case '-':
                    update();
                    isPositive = false;
                    break;
                case 'x':
                    isX = true;
                    if (s[i - 1] === '0') { isX = false; }
                    break;
                default:
                    num = num * 10 + Number(s[i]);
                    break;
            }
        }
        update();
        return res;
    }

    const equalSignPos = equation.indexOf('=');
    const leftVal = transformToVal(equation.substring(0, equalSignPos));
    const rightVal = transformToVal(equation.substring(equalSignPos + 1));

    if (leftVal.x === rightVal.x) {
        return leftVal.num === rightVal.num ? INFINITE_SOLUTION_MSG : NO_SOLUTION_MSG;
    }

    let x = leftVal.x - rightVal.x;
    let num = rightVal.num - leftVal.num;

    return `x=${num / x}`;
};
// @lc code=end