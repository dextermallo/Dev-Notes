/*
 * @lc app=leetcode id=1382 lang=typescript
 *
 * [1382] Balance a Binary Search Tree
 */

import { TreeNode } from './model';

// @lc code=start
/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

/**
 * Time complexity: O(n)
 * Space complexity: O(n)
 * @see https://leetcode.com/problems/balance-a-binary-search-tree/discuss/539686/JavaC%2B%2B-Sorted-Array-to-BST-O(N)-Clean-code
 */
function balanceBST(root: TreeNode | null): TreeNode | null {
    /**
     * by given a binary search tree, using in-order can retrieve a sorted array.
     */
    const sortedArray = (() => {
        let self: number[] = [];
        const inOrderTraverse = (node: TreeNode | null) => {
            if (node === null) { return; }
            inOrderTraverse(node.left);
            self.push(node.val);
            inOrderTraverse(node.right);
        }
        inOrderTraverse(root);
        return self;
    })();

    const buildBalancedBST = (l: number, r: number): TreeNode | null => {
        if (l > r) { return null; }
        const mid = Math.floor((r - l) / 2) + l;
        const node = new TreeNode(sortedArray[mid]);
        node.left = buildBalancedBST(l, mid - 1);
        node.right = buildBalancedBST(mid + 1, r);
        return node;
    };

    return buildBalancedBST(0, sortedArray.length - 1);
};
// @lc code=end

