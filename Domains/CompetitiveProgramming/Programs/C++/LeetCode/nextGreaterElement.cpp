// **Contributor ** :supritimishra //

/*
Problem: Next Greater Element I
Platform: Leetcode
Problem Code: 496
Difficulty: Medium
Link: https://leetcode.com/problems/next-greater-element-i/

Description:
Given two arrays nums1 and nums2 (nums1 is a subset of nums2), 
find the next greater number for each element in nums1 in nums2.
The next greater number of a number x in nums2 is the first greater number to its right.

Example: 
Input: 
    nums1 = [4,1,2], nums2 = [1,3,4,2]
Output: 
    [-1,3,-1]

Approach: 
1. Use a stack to keep track of elements for which we want the next greater number.
2. Traverse nums2 and maintain a map of next greater numbers.
3. For each number in nums1, lookup its next greater number from the map.
4. If no greater number exists, return -1.

Time Complexity: O(n + m) where n=nums1.size(), m=nums2.size()
Space Complexity: O(m) for stack and map

*/

#include<bits/stdc++.h>
using namespace std;

vector<int> nextGreaterElement(vector<int>& nums1, vector<int>& nums2) {
    unordered_map<int, int> nextGreater;
    stack<int> st;

    for(int num: nums2){
        while(!st.empty() && st.top() < num){
            nextGreater[st.top()] = num;
            st.pop();
        }
        st.push(num);
    }

    vector<int> result;
    for(int num: nums1){
        if(nextGreater.find(num) != nextGreater.end()){
            result.push_back(nextGreater[num]);
        } else {
            result.push_back(-1);
        }
    }
    return result;
}

int main(){
    vector<int> nums1 = {4,1,2};
    vector<int> nums2 = {1,3,4,2};

    cout << "nums1: ";
    for(auto a: nums1) cout << a << " ";
    cout << endl;

    cout << "nums2: ";
    for(auto a: nums2) cout << a << " ";
    cout << endl;

    vector<int> ans = nextGreaterElement(nums1, nums2);

    cout << "Next Greater Elements: ";
    for(auto a: ans) cout << a << " ";
    cout << endl;

    return 0;
}
