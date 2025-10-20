/*
Problem: New Year and Hurry
Platform: Codeforces
Problem Code: 750A
Difficulty: Easy
Link: https://codeforces.com/problemset/problem/750/A

Limak is going to participate in a contest on the last day of the 2016. The contest will start at 20:00 and will last four hours, exactly until midnight. 
There will be n problems, sorted by difficulty, i.e. problem 1 is the easiest and problem n is the hardest. Limak knows it will take him 5·i minutes to 
solve the i-th problem.

Limak's friends organize a New Year's Eve party and Limak wants to be there at midnight or earlier. He needs k minutes to get there from his house, where 
he will participate in the contest first.

How many problems can Limak solve if he wants to make it to the party?

Input
The only line of the input contains two integers n and k (1 ≤ n ≤ 10, 1 ≤ k ≤ 240) — the number of the problems in the contest and the number of minutes 
Limak needs to get to the party from his house.

Output
Print one integer, denoting the maximum possible number of problems Limak can solve so that he could get to the party at midnight or earlier.

Examples
Input:
3 222
Output:
2

Input:
4 190
Output:
4

Input:
7 1
Output:
7


Approach:
1. Find the total time availabel.
2. Lineraly calculate time for every next question.
3. When time for problems > time available, return last valid number of questions.

Time Complexity: O(n)
Space Complexity: O(1)

Contributor: SamaKool
*/

#include<bits/stdc++.h>
using namespace std; 

int main(){
    int n, k;
    cin>>n;
    cin>>k;
    int t = 240 - k;
    int ans = 0;
    int i = 1;
    for(i = 1; i <= n; i++){
        if(ans + 5*i <= t){
            ans += 5*i;
        }
        else {
            i = i - 1;
            break;
        }
        if(i == n) break;
    }
    cout<<i;
    return 0;
}