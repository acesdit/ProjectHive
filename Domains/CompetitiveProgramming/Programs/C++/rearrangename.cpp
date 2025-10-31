/*
Problem: Rearrange Name
Platform: Codeforces
Problem Code: 2167B
Link: https://codeforces.com/contest/2167/problem/B
Difficulty: Easy

Contributor: Sagarankita

Problem Statement:
 
khba is writing his girlfriend's name. He has 𝑛 cubes, each with one lowercase Latin letter written on it. 
They are arranged in a row, forming a string 𝑠.
 His girlfriend's name is also a string 𝑡, consisting of 𝑛 lowercase Latin letters.
To prove his love, he must check whether it is possible to rearrange the letters of string 𝑠 so that it becomes her name 𝑡.

Testcases:
Input:
5
7
humitsa mitsuha
4
orhi hori
6
aakima makima
6
nezuqo nezuko
6
misaka mikasa

OUTPUT:
YES
YES
NO
NO
YES

Approach:
Check if s and t are anagrams. 
Sort both strings and compare equality.
If sorted(s) == sorted(t) → YES, 
else → NO.

Time Complexity: O(q · n log n)
Space Complexity: O(n)
*/

#include <iostream>
#include <algorithm>
#include <string>
using namespace std;
int main() {
    int t;
    cin >> t;
    while (t--) {
        int n;
        string str1, str2;
        cin >> n >> str1 >> str2;
        sort(str1.begin(), str1.end());
        sort(str2.begin(), str2.end());
        if (str1 == str2) 
        {
            cout << "YES" << endl;
        } else 
        {
            cout << "NO" << endl;
        }
    }
    return 0;
}