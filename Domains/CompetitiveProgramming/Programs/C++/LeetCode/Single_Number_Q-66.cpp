// **Contributor** : Utkarsh-660 //

/*
Problem: Single Number
Platform: LeetCode
Problem Code: 66
Difficulty: Easy

Description:
You are given a non-empty array of integers `nums`, where every element appears twice except for one. 
Find and return the single element that appears only once.

Example:
Input:
    nums = [4,1,2,1,2]
Output:
    4

Explanation:
Every element appears twice except 4, which appears only once.

Approach:
1. Use a map to store the frequency of each number.
2. Traverse the array and increment the count for each number in the map.
3. Iterate over the map and find the key with a frequency of 1.
4. Return that number as the result.

Time Complexity: O(n)
Space Complexity: O(n)
*/



#include <iostream>
#include <vector>
#include <map>
using namespace std;

int singleNumber(vector<int>& nums) {
    map<int, int> mp;
    for (int i = 0; i < nums.size(); i++) {
        mp[nums[i]] += 1;
    }
    int num;
    for (auto it : mp) {
        if (it.second == 1) {
            num = it.first;
            break;
        }
    }
    return num;
}

int main() {
    int n;
    cout << "Enter number of elements: ";
    cin >> n;

    vector<int> nums(n);
    cout << "Enter elements: ";
    for (int i = 0; i < n; i++) {
        cin >> nums[i];
    }

    int result = singleNumber(nums);
    cout << "The single number is: " << result << endl;

    return 0;
}
