/*
Problem: Add Two Numbers
Platform: Leetcode
Problem Code: Q2
Difficulty: Medium
Link: https://leetcode.com/problems/add-two-numbers/

Problem Statement:
You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.

Constraints:

The number of nodes in each linked list is in the range [1, 100].
0 <= Node.val <= 9
It is guaranteed that the list represents a number that does not have leading zeros.

Example 1:

Input: l1 = [0], l2 = [0]
Output: [0]

Example 2:

Input: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
Output: [8,9,9,9,0,0,0,1]
 
Approach:
1.Use a dummy head to simplify building the result linked list.
2.Initialize a carry = 0 to handle sums ≥ 10.
3.Traverse both linked lists together:
    Get the current digits (use 0 if a list is shorter).
    Compute sum = digit1 + digit2 + carry.
    Update carry = sum / 10.
    Create a new node with value sum % 10 and append it to the result.
4.Move the pointers of l1 and l2 forward.
5.Continue until both lists are done and carry is 0.
6.Return dummy.next as the head of the resulting linked list.

Time Complexity: O(max(m, n))
Space Complexity: O(max(m, n))

Contributor: Ansh-1019
*/

/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        ListNode dummy = new ListNode(0);
        ListNode current = dummy;
        int carry = 0;

        while (l1 != null || l2 != null || carry != 0) {
            int x = (l1 != null) ? l1.val : 0;
            int y = (l2 != null) ? l2.val : 0;
            int sum = x + y + carry;
            carry = sum / 10;
            current.next = new ListNode(sum % 10);
            current = current.next;

            if (l1 != null) l1 = l1.next;
            if (l2 != null) l2 = l2.next;
        }

        return dummy.next;
    }
}
