#include<bits/stdc++.h>
using namespace std;

class Solution {
  public:
  
   void dfs(int node, vector<int>& visited, vector<vector<int>>& adj, stack<int>& st){
       visited[node] = 1;
       
       for(int i=0; i<adj[node].size(); i++){
           if(!visited[adj[node][i]]){
               dfs(adj[node][i], visited, adj, st);
           }
       }
       
       st.push(node);
   }
  
    vector<int> topoSort(int V, vector<vector<int>>& edges) {
        vector<vector<int>> adj(V);
        
        for(int i=0; i<edges.size(); i++){
            adj[edges[i][0]].push_back(edges[i][1]);
        }
        
        stack<int> st;
        vector<int> visited(V, 0);
         
        for(int i=0; i<V; i++){
            if(!visited[i]){
                dfs(i, visited, adj, st);
            }
        }
        
        vector<int> ans;
        
        while(!st.empty()){
            ans.push_back(st.top());
            st.pop();
        }
        
        return ans;
        
    }
};

int main(){
    Solution sol;
    int V = 6;
    vector<vector<int>> edges = {{5, 2}, {5, 0}, {4, 0}, {4, 1}, {2, 3}, {3, 1}};
    vector<int> result = sol.topoSort(V, edges);

    cout << "Topological Sort Order: ";
    for(int node : result){
        cout << node << " ";
    }
    cout << endl;

    return 0;
}