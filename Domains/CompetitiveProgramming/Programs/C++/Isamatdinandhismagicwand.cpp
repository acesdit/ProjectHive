/*
Problem: Isamatdin and His Magic Wand!
Platform: Codeforces
Problem Code: 2167C
Link: https://codeforces.com/contest/2167/problem/C
Difficulty: Medium

Contributor: Sagarankita

Problem Statement:
Isamatdin has 𝑛 toys arranged in a row. The 𝑖-th toy has an integer 𝑎𝑖. 
He wanted to sort them because otherwise, his mother would scold him.
However, Isamatdin never liked arranging toys in order, so his friend JahonaliX gave him a magic wand to help. 
Unfortunately, JahonaliX made a small mistake while creating the wand.
But Isamatdin couldn't wait any longer and decided to use the broken wand anyway. 
The wand can only swap two toys if their integers have different parity (one is even, the other is odd). 
In other words,you can swap toys in positions (𝑖,𝑗) only if 𝑎𝑖mod2≠𝑎𝑗mod2, where mod — is the remainder of integer division.
Now he wants to know the lexicographically smallest∗ arrangement he can achieve using this broken wand.

Approach:
Input Reading:
Read the number of test cases t.
For each test case, read n and the array a.
Parity Check:
Initialize two boolean flags: even and odd.
Traverse the array:
If an element is even → set even = true.
If an element is odd → set odd = true.
Sorting Condition:
If both even and odd are true (i.e., mixed parity), sort the array using sort() from <algorithm>.
If not, the array remains unchanged.

Time Complexity
For each test case:
Checking parity → O(n)
Sorting (if both even and odd exist) → O(n log n)
So, overall per test case:
O(n log n) in the worst case.

Overall Space Complexity: O(n)

Test Cases:
INPUT:
7
4
2 3 1 4
5
3 2 1 3 4
4
3 7 5 1
2
1000000000 2
3
1 3 5
5
2 5 3 1 7
4
2 4 8 6

OUTPUT:
1 2 3 4 
1 2 3 3 4 
3 7 5 1 
1000000000 2 
1 3 5 
1 2 3 5 7 
2 4 8 6 
*/
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;
int main() {
    int t;
    cin >> t;
    while (t--) {
        int n;
        cin >> n;
        vector<int> a(n);
        bool even = false, odd = false;
        for (int i = 0; i < n; i++) {
            cin >> a[i];
            if (a[i] % 2 == 0)
                even = true;
            else
                odd = true;
        }
        if (even && odd) {
            sort(a.begin(), a.end());
        }
        for (int i = 0; i < n; i++) {
            cout << a[i] << " ";
        }
        cout << "\n";
    }
    return 0;
}
