// **Contributor** : Utkarsh-660 //

/*
Problem: Merge Two Sorted Arrays
Platform: Leetcode
Problem Code: 88
Difficulty: Easy
Link: https://leetcode.com/problems/merge-sorted-array/

Description:
Given two sorted arrays `nums1` and `nums2` of sizes `m` and `n` respectively, 
merge them into a single sorted array. The task is to return a new array containing 
all elements from both arrays in sorted order.

Example:
Input:
    nums1 = [1,2,3], m = 3
    nums2 = [2,5,6], n = 3
Output:
    [1,2,2,3,5,6]

Explanation:
All elements from both arrays are combined while maintaining sorted order.

Approach:
1. Initialize two pointers `left` and `right` at the start of `nums1` and `nums2`.
2. Compare elements at both pointers and push the smaller one to the result array.
3. Move the pointer of the array from which the element was taken.
4. After one array is fully traversed, append the remaining elements from the other array.
5. Return the merged sorted array.

Time Complexity: O(m + n)
Space Complexity: O(m + n)
*/


#include <bits/stdc++.h>
using namespace std;

vector<int> merge(vector<int> nums1, int m, vector<int> nums2, int n) {
    vector<int> v3;
    int left = 0, right = 0;

    while (left < m && right < n) {
        if (nums1[left] < nums2[right]) {
            v3.push_back(nums1[left]);
            left++;
        } else {
            v3.push_back(nums2[right]);
            right++;
        }
    }

    while (left < m) {
        v3.push_back(nums1[left]);
        left++;
    }

    while (right < n) {
        v3.push_back(nums2[right]);
        right++;
    }

    return v3;
}

int main() {
    int m, n;
    cout << "Enter the size of first array: ";
    cin >> m;
    vector<int> nums1(m);
    cout << "Enter elements of first sorted array: ";
    for (int i = 0; i < m; i++) {
        cin >> nums1[i];
    }

    cout << "Enter the size of second array: ";
    cin >> n;
    vector<int> nums2(n);
    cout << "Enter elements of second sorted array: ";
    for (int i = 0; i < n; i++) {
        cin >> nums2[i];
    }

    vector<int> final = merge(nums1, m, nums2, n);

    cout << "Merged array: ";
    for (int i = 0; i < final.size(); i++) {
        cout << final[i] << " ";
    }
    cout << endl;
}
