
// **Contributor** : Utkarsh-660 //

/*
Problem: Plus One
Platform: Leetcode
Problem Code: 66
Difficulty: Easy
Link: https://leetcode.com/problems/plus-one/

Description:
You are given a large integer represented as an array of digits, where each digit[i] is the ith digit of the number. 
The digits are ordered from most significant to least significant in left-to-right order. 
The task is to add one to the integer and return the resulting array of digits.

Example:
Input:
    digits = [1,2,3]
Output:
    [1,2,4]

Explanation:
123 + 1 = 124, so the result is [1,2,4].

Approach:
1. Start from the last digit (least significant).
2. If the digit is less than 9, simply increment it and return the array.
3. If it is 9, set it to 0 and move one digit left.
4. If all digits are 9, insert 1 at the beginning (e.g., 999 + 1 = 1000).
5. Return the final vector.

Time Complexity: O(n)
Space Complexity: O(1)
*/


#include <bits/stdc++.h>
using namespace std;

vector<int> plusOne(vector<int>& digits) {
    if (digits.back() < 9) {
        digits.back() += 1;
    } else {
        digits.back() = 0;
        for (int i = digits.size() - 2; i >= 0; i--) {
            if (digits[i] < 9) {
                digits[i] += 1;
                return digits;
            } else {
                digits[i] = 0;
            }
        }
        digits.insert(digits.begin(), 1);
    }
    return digits;
}

int main() {
    vector<int> nums;
    int size;
    cout << "Enter the size of vector: ";
    cin >> size;

    cout << "Enter the elements: ";
    for (int i = 0; i < size; i++) {
        int x;
        cin >> x;
        nums.push_back(x); 
    } 

    vector<int> result = plusOne(nums);

    cout << "Result: ";
    for (int i = 0; i < result.size(); i++) {
        cout << result[i] << " ";
    }
    cout << endl;
}
