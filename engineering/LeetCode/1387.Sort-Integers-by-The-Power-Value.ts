// dp[x], where x = 0 - 1000 (range of int), y = [int, val]
// we use 2D-array to save both int and val, and then sort with lambda eventually
const dp: number[][] = new Array<number[]>(1001);

/*
desc: build the dp array
time complexity: O(hi)

as a recursion fn, an estimated time complexity is based on several rounds of testing to see
how many function calls are made. Results:

size (hi)   function call
101         => 902
201         => 1,592
301         => 2,199
401         => 2,746
501         => 3,361
1001        => 6,378
5000        => 31,192
10000       => 61,838
100000      => 620,908
1000000     => 6,226,257
time complexity ~ O(hi * 6) = O(hi)

*/
const buildDP = () => {

    for (let i = 0; i < 1001; ++i) {
        dp[i] = [i, 0];
    } 

    const compute = (i: number): number => {
        if (i < 2) { return 0; }
        // used dp directly if val has been calculated already
        if (i < 1001 && dp[i][1] !== 0) { return dp[i][1]; }
        return 1 + (i % 2 ? compute(i * 3 + 1) : compute(i / 2));
    }

    for (let i = 2; i <= 1000; ++i) {
        dp[i][1] = compute(i);
    }
}


// let n = hi - lo, time complexity = O(nlogn) + O(hi)
// space complexity = O(n)
function getKth(lo: number, hi: number, k: number): number {
    if (dp[0] === undefined) { buildDP(); }
    return dp.slice(lo, hi + 1).sort((a, b) => a[1] === b[1] ? a[0] - b[0] : a[1] - b[1])[k - 1][0];
};