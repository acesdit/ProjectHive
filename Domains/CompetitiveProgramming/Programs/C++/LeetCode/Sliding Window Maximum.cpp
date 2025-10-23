/*
Problem: Sliding Window Maximum
Platform: LeetCode
Problem Code: 239
Difficulty: Hard
Link: https://leetcode.com/problems/sliding-window-maximum/

Problem Statement:
You are given an integer array nums and an integer k representing a sliding window of size k.
Each time the window moves right by one position, you need to return the maximum value in it.

Return an array of the maximum values for each window.

Example:
Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
Output: [3,3,5,5,6,7]

Approach:
Use a deque (double-ended queue) to keep track of useful elements' indices:
- Maintain elements in decreasing order of their values.
- Remove elements from the front if they fall out of the window.
- The element at the front of the deque is always the maximum of the current window.

Contributor: RudraDarwey
*/



#include <vector>
#include <deque>
using namespace std;

class Solution {
public:
    vector<int> maxSlidingWindow(vector<int>& nums, int k) {
        deque<int> dq;
        vector<int> result;

        for (int i = 0; i < nums.size(); ++i) {
            if (!dq.empty() && dq.front() == i - k)
                dq.pop_front();

            while (!dq.empty() && nums[dq.back()] < nums[i])
                dq.pop_back();

            dq.push_back(i);

            if (i >= k - 1)
                result.push_back(nums[dq.front()]);
        }

        return result;
    }
};
