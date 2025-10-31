#include<bits/stdc++.h>
using namespace std;

class Solution {
public:
    vector<vector<int>> fourSum(vector<int>& nums, int target) {
        sort(nums.begin(), nums.end());

        int n = nums.size();

        vector<vector<int>> ans;

        for(int i=0; i<n-3; i++){
            if(i != 0 && nums[i-1] == nums[i]) continue;
            for(int j=i+1; j<n-2; j++){
                if(j != (i+1) && nums[j-1] == nums[j]) continue;

                int l = j + 1;
                int r = n-1;

                while(l < r){
                long long sum = nums[i] + nums[j] ;
                sum += nums[l];
                sum += nums[r];

                  if(sum > target){
                    r--;
                  }
                  else if(sum < target){
                    l++;
                  }
                  else{
                    vector<int> res = {nums[i], nums[j], nums[l], nums[r]};
                    ans.push_back(res);

                    while(l < r && nums[l+1] == nums[l]) l++;
                    while(l < r && nums[r] == nums[r-1]) r--;

                    l++;
                    r--;
                  }

                }
            }
        }

        return ans;
    }
};

int main(){
    Solution sol;
    vector<int> nums = {1, 0, -1, 0, -2, 2};
    int target = 0;
    vector<vector<int>> result = sol.fourSum(nums, target);

    cout << "Quadruplets that sum to " << target << ":\n";
    for(const auto& quad : result){
        cout << "[";
        for(int num : quad){
            cout << num << " ";
        }
        cout << "]\n";
    }

    return 0;
}