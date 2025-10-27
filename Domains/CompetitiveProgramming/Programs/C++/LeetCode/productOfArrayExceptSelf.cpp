// **Contributor** : supritimishra//

/*
Problem: Product of Array Except Self
Platform: Leetcode
Problem Code: 238
Difficulty: Medium
Link: https://leetcode.com/problems/product-of-array-except-self/

Description:
Given an integer array nums, return an array answer such that answer[i] is equal to 
the product of all the elements of nums except nums[i]. Solve it without using division 
and in O(n) time.

Example: 
Input: 
    nums = [1,2,3,4]
Output: 
    [24,12,8,6]

Approach: 
1. Initialize two arrays (or variables) to store prefix and suffix products.
2. Traverse from left to right to compute prefix products.
3. Traverse from right to left to compute suffix products and multiply with prefix.
4. This avoids division and computes product of all elements except self.

Time Complexity: O(n)
Space Complexity: O(1) (excluding output array)
*/

#include<bits/stdc++.h>
using namespace std;

vector<int> productExceptSelf(vector<int>& nums) {
    int n = nums.size();
    vector<int> result(n,1);

    int prefix = 1;
    for(int i=0;i<n;i++){
        result[i] = prefix;
        prefix *= nums[i];
    }

    int suffix = 1;
    for(int i=n-1;i>=0;i--){
        result[i] *= suffix;
        suffix *= nums[i];
    }

    return result;
}

int main(){
    vector<int> nums = {1,2,3,4};

    cout << "Input array: ";
    for(auto n: nums) cout << n << " ";
    cout << endl;

    vector<int> ans = productExceptSelf(nums);

    cout << "Product of Array Except Self: ";
    for(auto a: ans) cout << a << " ";
    cout << endl;

    return 0;
}
