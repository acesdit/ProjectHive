/*
Project: Operator Overloading and Class Composition Example
Platform: C++ (OOP Practice)
Concepts: Operator Overloading, Classes, Objects, STL List, Encapsulation

Description:
This program demonstrates the use of operator overloading in C++ for both 
custom objects and collections. It defines two classes — `Youtubechannel` and 
`Mycollection`.

1. The `Youtubechannel` class stores the name and subscriber count of a channel 
   and overloads the `<<` operator to display its details.
2. The `Mycollection` class maintains a list of Youtubechannel objects and 
   overloads the `+=` operator to add channels to the collection. It also 
   overloads the `<<` operator to display all channels in the collection.

Input:
No user input — all data is hardcoded in `main()` for demonstration.

Output:
Displays details of individual channels and the list of all channels.

Example Output:
Name: code aur chai
Subscriber count: 750000
Name: Code with harry
Subscriber count: 80000
Name: code aur chai
Subscriber count: 750000
Name: Code with harry
Subscriber count: 80000

Approach:
1. Create a `Youtubechannel` class with attributes and a custom `<<` overload.
2. Create a `Mycollection` class using STL `list` to store channels.
3. Overload `+=` to add objects and `<<` to print the entire collection.

Key Concepts Used:
- Operator Overloading (`<<`, `+=`)
- STL List
- Object Composition
- Stream Insertion for Custom Classes

Contributor: Utkarsh Sharma
*/



#include<iostream>
#include<string>
#include<list>
using namespace std;
#include<string>
class Youtubechannel{
    public:
    string name;
    int Subscribercount;
Youtubechannel(string n,int count){
    name=n;
    Subscribercount=count;

}

};
ostream& operator<<(ostream& COUT,Youtubechannel& yt){
    COUT<<"Name:"<<yt.name<<endl;
    COUT<<"Subscriber count:"<<yt.Subscribercount<<endl;
    return COUT;
}
class Mycollection{
    public:
    list<Youtubechannel>mychannels;
    void operator+=(Youtubechannel& channel){
     this->mychannels.push_back(channel);

    }

};
ostream& operator<<(ostream& COUT,Mycollection mycoll){
    for(Youtubechannel ytchannel:mycoll.mychannels)
    COUT<<ytchannel<<endl;
    return COUT;
}
int main()
{
    Youtubechannel yt1=Youtubechannel("code aur chai",750000);
    Youtubechannel yt2=Youtubechannel("Code with harry",80000);
 
    cout <<yt1;
    cout<<yt2;
    cout<<yt1<<yt2;
    
    //or to write both in same linr for chanining the return type must be ostream in place of void 
//it will give error we have to overload this operator <<


//now i want to add yt1 to the list i made in Mycollection class
Mycollection myCollection;
myCollection+=yt1;//now here you want to overload += this operator to put my yt1 object in mycollection
myCollection+=yt2;//now here you want to overload += this operator to put my yt1 object in mycollection

}