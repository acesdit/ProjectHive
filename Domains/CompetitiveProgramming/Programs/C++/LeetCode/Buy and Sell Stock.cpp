/*
Problem: Best Time to Buy and Sell Stock II
Platform: LeetCode
Problem Code: 122
Difficulty: Medium
Link: https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/

Problem Statement:
You are given an integer array prices where prices[i] represents the price of a stock on the ith day.
You may complete as many transactions as you like (i.e., buy one and sell one share multiple times), 
but you can only hold at most one share of the stock at a time.

Return the maximum profit you can achieve.

Example:
Input: prices = [7,1,5,3,6,4]
Output: 7

Approach:
We simply add up all the increases between consecutive days 
(prices[i] - prices[i-1] whenever it's positive). 
This greedy approach works because every increasing segment contributes to the profit.

Contributor: RudraDarwey
*/



#include <vector>
using namespace std;

class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int profit = 0;
        for (int i = 1; i < (int)prices.size(); ++i) {
            if (prices[i] > prices[i - 1]) profit += prices[i] - prices[i - 1];
        }
        return profit;
    }
};
