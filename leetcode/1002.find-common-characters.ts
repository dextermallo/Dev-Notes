/*
 * @lc app=leetcode id=1002 lang=typescript
 *
 * [1002] Find Common Characters
 */

// @lc code=start
/**
 * Time complexity: O(n)
 * Space complexity: O(n) 
 * (n = total characters in words)
 */
function commonChars(words: string[]): string[] {

    let cnt = strCnt(words[0]);

    for (let i = 1; i < words.length; ++i) {
        let curCnt = strCnt(words[i]);

        for (const cntChar in cnt) {
            if (curCnt[cntChar] === undefined) {
                cnt[cntChar] = undefined;
            } else {
                cnt[cntChar] = Math.min(curCnt[cntChar], cnt[cntChar]);
            }
        }
    }

    return StrCntToArr(cnt);
};

function strCnt(s: string): Record<string, number> {
    let res: Record<string, number> = {};
    for (const c of s) {
        if (res[c] === undefined) { res[c] = 0; }
        ++res[c];
    }
    return res;
} 

function StrCntToArr(mp: Record<string, number>): Array<string> {
    let res: Array<string> = [];

    for (const char in mp) {
        res = res.concat(char.repeat(mp[char]).split(''));
    }

    return res;
}

// @lc code=end

