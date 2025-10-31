#include<bits/stdc++.h>
using namespace std;

class Solution {
public:
    bool isAnagram(string s, string t) {
        int n = s.size();
        vector<int> count(26);

        if(s.size() != t.size()) return false;

        for(int i=0; i<s.size(); i++){
           count[s[i]- 'a']++;
           count[t[i] -'a']--;
        }

        for(auto it: count){
            if(it != 0){
                return false;
            }
        }

        return true;
    }
};

int main(){
    Solution sol;
    string s = "anagram", t = "nagaram";
    cout << (sol.isAnagram(s, t) ? "True" : "False") << endl;
    return 0;
}