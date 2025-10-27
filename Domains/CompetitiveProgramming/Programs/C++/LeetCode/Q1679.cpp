/*
--------------------------------------------------------------
LeetCode Problem: 1679. Max Number of K-Sum Pairs
Difficulty: Medium
Topics: Array Hash Table Two PointersSorting
Time complexity: O(NlogN)
Space complexity: O(1)
Contibutor:- Utsav Ojha
--------------------------------------------------------------

🧩 Problem Statement:
You are given an integer array 'nums' and an integer 'k'.

In one operation, you can pick two numbers from the array 
whose sum equals 'k' and remove them from the array.

You need to return the *maximum number of such operations* 
you can perform on the array.

--------------------------------------------------------------
🔹 Example 1:
Input:  nums = [1, 2, 3, 4], k = 5
Output: 2

Explanation:
- Start with nums = [1, 2, 3, 4]
- Remove the pair (1, 4) → nums = [2, 3]
- Remove the pair (2, 3) → nums = []
No more pairs can be formed → total operations = 2

--------------------------------------------------------------
🔹 Example 2:
Input:  nums = [3, 1, 3, 4, 3], k = 6
Output: 1

Explanation:
- Start with nums = [3, 1, 3, 4, 3]
- Remove one pair of (3, 3) → nums = [1, 4, 3]
No more pairs can be formed → total operations = 1

--------------------------------------------------------------
📏 Constraints:
1 <= nums.length <= 10^5
1 <= nums[i] <= 10^9
1 <= k <= 10^9

--------------------------------------------------------------
*/
class Solution {
public:
    int maxOperations(vector<int>& nums, int k) {
        int count=0;
        int n= nums.size();
        int l=0;
        int h=n-1;
        sort(nums.begin(), nums.end());
        while(l<h){
            if((nums[l]+nums[h])==k){
                count++;
                
                l++;
                h--;

            }
            else if((nums[l]+nums[h])>k){
                h--;
            }
            else{
                l++;
            }

        }
        return count;
    }
};
