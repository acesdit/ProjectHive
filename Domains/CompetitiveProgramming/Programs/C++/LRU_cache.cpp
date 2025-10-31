#include<bits/stdc++.h>
using namespace std;

class LRUCache {
public:
    struct Node{
        Node* prev;
        Node* next;
        pair<int, int> data;

        Node(){
            prev = NULL;
            next = NULL;
            data = {0,0};
        }

        Node(int key, int val){
            data.first = key;
            data.second = val;
            prev = NULL;
            next = NULL;
        }
    };

    int size;

    Node* head = nullptr;
    Node* tail = nullptr;

    int n = 0;

    map<int, Node*> mpp;

    void insertathead(Node* header){
        Node* nextelement = head->next;
        head->next = header;
        header->prev = head;
        header->next = nextelement;
        nextelement->prev = header;
    }

    void deletenode(Node* nodeelement){
        nodeelement->prev->next = nodeelement->next;
        nodeelement->next->prev = nodeelement->prev;
        
    }
    

    LRUCache(int capacity) {
        size = capacity;
        Node *inithead = new Node(-1, -1);
        Node *inittail = new Node(-1, -1);

        head = inithead;
        tail = inittail;

        head->next = tail;
        tail->prev = head;


    }
    
    int get(int key) {
        if(mpp.find(key) != mpp.end()){
            Node* temp = mpp[key];
            deletenode(temp);
            insertathead(temp); 
            return temp->data.second;
        }
        else{
            return -1;
        }
    }
    
    void put(int key, int value) {
        if(mpp.find(key) != mpp.end()){
            Node* element = mpp[key];
            element->data.second = value;
            get(key);
            return;
        }
        Node *temp = new Node(key, value);
        if(n == size){
            Node* lastnode = tail->prev;
            int lastelement = lastnode->data.first;
            deletenode(lastnode);
            delete(lastnode);
            mpp.erase(lastelement);
            n--;
        }
        insertathead(temp);
        mpp[key] = temp;
        n++;
    }
};


int main() {
    LRUCache lru(2);
    lru.put(1, 1); // cache is {1=1}
    lru.put(2, 2); // cache is {1=1, 2=2}
    cout << lru.get(1) << endl; // return 1
    lru.put(3, 3); // LRU key was 2, remove key 2, cache is {1=1, 3=3}
    cout << lru.get(2) << endl; // returns -1 (not found)
    lru.put(4, 4); // LRU key was 1, remove key 1, cache is {3=3, 4=4}
    cout << lru.get(1) << endl; // returns -1 (not found)
    cout << lru.get(3) << endl; // returns 3
    cout << lru.get(4) << endl; // returns 4
    return 0;
}