//**Contributor** : supritimishra //

/*
Problem: Trapping Rain Water
Platform: Leetcode
Problem Code: 42
Difficulty: Hard
Link: https://leetcode.com/problems/trapping-rain-water/

Description:
Given n non-negative integers representing an elevation map where the width of each bar is 1, 
compute how much water it can trap after raining.

Example: 
Input: 
    height = [0,1,0,2,1,0,1,3,2,1,2,1]
Output: 
    6

Approach: 
1. Use two pointers (left and right) to traverse the array from both ends.
2. Maintain the maximum height seen from left and right.
3. Water trapped at each position = min(maxLeft, maxRight) - height[i].
4. Sum the water trapped at all positions.

Time Complexity: O(n)
Space Complexity: O(1)
*/

#include<bits/stdc++.h>
using namespace std;

int trap(vector<int>& height) {
    int n = height.size();
    int left = 0, right = n - 1;
    int maxLeft = 0, maxRight = 0;
    int water = 0;

    while(left <= right){
        if(height[left] <= height[right]){
            if(height[left] >= maxLeft) maxLeft = height[left];
            else water += maxLeft - height[left];
            left++;
        } else {
            if(height[right] >= maxRight) maxRight = height[right];
            else water += maxRight - height[right];
            right--;
        }
    }
    return water;
}

int main(){
    vector<int> height = {0,1,0,2,1,0,1,3,2,1,2,1};

    cout << "Elevation map: ";
    for(auto h: height) cout << h << " ";
    cout << endl;

    int ans = trap(height);
    cout << "Trapped Rain Water: " << ans << endl;

    return 0;
}
