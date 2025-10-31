#include<bits/stdc++.h>
using namespace std;

class Solution {
public:
    int orangesRotting(vector<vector<int>>& grid) {
        int n = grid.size();
        int m = grid[0].size();

        vector<vector<int>> visited(n, vector<int>(m, 0));

        int time = 0;
        
        queue<pair<pair<int, int>, int>> qu;

        for(int i=0; i<n; i++){
            for(int j=0; j<m; j++){
                if(grid[i][j] == 2){
                    visited[i][j] = 2;
                    qu.push({{i, j}, time});
                }
            }
        }

        while(!qu.empty()){
            int l = qu.size();
                int i = qu.front().first.first;
                int j = qu.front().first.second;
                int t = qu.front().second;
                qu.pop();

                if(i-1 >= 0 && grid[i-1][j] == 1 && visited[i-1][j] != 2){
                   visited[i-1][j] = 2;
                   qu.push({{i-1, j}, t+1});
                }
                if(j-1 >= 0 && grid[i][j-1] == 1  && visited[i][j-1] != 2){
                   visited[i][j-1] = 2;
                   qu.push({{i, j-1}, t+1});
                }
                if(i+1 < n && grid[i+1][j] == 1  && visited[i+1][j] != 2){
                   visited[i+1][j] = 2;
                   qu.push({{i+1, j}, t+1});
                }
                if(j+1 < m && grid[i][j+1] == 1  && visited[i][j+1] != 2){
                   visited[i][j+1] = 2;
                   qu.push({{i, j+1}, t+1});
                }

                time = max(time, t);
            
        }

        for(int i=0; i<n; i++){
            for(int j=0; j<m; j++){
                if(visited[i][j] != 2 && grid[i][j] == 1){
                    return -1;
                }
            }
        }

        return time;

    }
};

int main(){
    vector<vector<int>> grid = {{2,1,1}, {1,1,0}, {0,1,1}};
   
    Solution obj;
    int ans = obj.orangesRotting(grid);
    cout << ans << endl;
    return 0;
}