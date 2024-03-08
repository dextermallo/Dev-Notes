/*
 * @lc app=leetcode id=2129 lang=typescript
 *
 * [2129] Capitalize the Title
 */

// @lc code=start
/**
 * Time complexity: O(n)
 * Space complexity: O(n)
 */
function capitalizeTitle(title: string): string {
    return title.split(' ').map(word => {
        if (word.length < 3) { return word.toLowerCase(); }
        return word[0].toUpperCase() + word.substring(1).toLowerCase();
    }).join(' ');
};
// @lc code=end

