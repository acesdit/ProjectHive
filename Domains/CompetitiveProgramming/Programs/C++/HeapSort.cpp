#include<bits/stdc++.h>
using namespace std;

class Heap{

    public:
     vector<int> a;

     Heap(vector<int>& arr){
        a = arr;
        insert();  //converted to max heap
        int n = arr.size();
        for(int i=0; i<n; i++){
           swap(a[0], a[n-i-1]);
           heapify(0, n-i-1);
        }

     }

    void insert(){
        int n = a.size();
        for(int index=(n-1)/2; index>=0; index--){
           heapify(index, n);
        }

    }

    void heapify(int i, int n){
        int largest = i;
        int left = (i * 2) + 1;
        int right = (i * 2) + 2;

        if(left < n && a[largest] < a[left]){
            largest = left;
        }

        if(right < n && a[largest] < a[right]){
            largest = right;
        }

        if(largest != i){
            swap(a[largest], a[i]);
            heapify(largest, n);
        }
    }

    void print(){
        for(auto it: a){
            cout<<it<<" ";
        }
        cout<<"Printed"<<endl;
    }
};

int main(){
    vector<int> a ={15, 21, 30, 1, 9, 22};
    Heap h1(a);
    h1.print();
}