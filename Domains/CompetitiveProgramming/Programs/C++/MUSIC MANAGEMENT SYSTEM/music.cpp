#include <fstream>
#include <conio.h>
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <process.h>
#include <direct.h>
#include <iostream>
using namespace std;

// --------------------------- SIGNUP & LOGIN CLASS ---------------------------
class Sign {
public:
    string email, pass, user;

    void get_data() {
        cout << "Enter email: ";
        cin >> email;
        cout << "Enter username: ";
        cin >> user;
        cout << "Enter password: ";
        cin >> pass;
        cout << "Your account is created. Now Log In.\n";
        store();
    }

    void store() {
        ofstream filestream("data.txt");
        if (filestream.is_open()) {
            filestream << "Email=" << email << endl;
            filestream << "Username=" << user << endl;
            filestream << "Password=" << pass << endl;
            filestream.close();
        }
    }
};

class Login : public Sign {
    int ch;
    string pas, uname;

public:
    void check() {
        cout << "Press\n1: Sign Up\n2: Log In\n";
        cin >> ch;
        if (ch == 1) {
            get_data();
            log();
        } else {
            log();
        }
    }

    void log() {
    jump:
        cout << "Enter username: ";
        cin >> uname;
        if (uname == user) {
        here:
            cout << "Enter Password: ";
            cin >> pas;
            while (pas != pass) {
                cout << "Wrong password\n";
                goto here;
            }
            cout << "Login Successful!!\n";
        } else {
            cout << "Invalid username\n";
            goto jump;
        }
    }
};

// --------------------------- LOADING ANIMATION ---------------------------
void time_delay() {
    int i = 0;
    long long j;
    cout << "\n\n\nConnecting to Server\nSyncing Data";
    while (i < 10) {
        for (j = 5; j > 4; j++) {
            if (j == 99999) {
                cout << ".";
                break;
            }
        }
        ++i;
    }
}

// --------------------------- PLAYLIST CLASS ---------------------------
class playlist {
public:
    string playn, aname, sname;

    void menu();
    void add();
    void genre();
    void storep();
    void del();
    void play();
};

void playlist::menu() {
    int ch = 0;
    while (ch != 5) {
        cout << "\n\t\t\t\t* MAIN MENU *";
        cout << "\n\t\t\t1. Add songs";
        cout << "\n\t\t\t2. Genre";
        cout << "\n\t\t\t3. Playlist";
        cout << "\n\t\t\t4. Delete";
        cout << "\n\t\t\t5. Exit";
        cout << "\n\n\t\t\tEnter Your Choice: ";
        cin >> ch;

        switch (ch) {
        case 1:
            add();
            break;
        case 2:
            genre();
            break;
        case 3:
            play();
            break;
        case 4:
            del();
            break;
        case 5:
            cout << "\nExiting Playlist Menu...\n";
            break;
        default:
            cout << "\n\n\t\t\tWrong choice!";
            cout << "\n\t\t\tPress any key to continue!!";
            getch();
        }
    }
}

void playlist::add() {
    cout << "\nEnter playlist name: ";
    cin >> playn;
    cout << "\nEnter song name: ";
    cin >> sname;
    cout << "\nEnter artist name: ";
    cin >> aname;
    storep();
    cout << "\nSong added successfully!\n";
    getch();
}

void playlist::storep() {
    ofstream filestream("song.txt", ios::app);
    if (filestream.is_open()) {
        filestream << "Song Name: " << sname << endl;
        filestream << "Artist: " << aname << endl;
        filestream << "-----------------------" << endl;
        filestream.close();
    }
}

void playlist::del() {
    string songToDelete;
    cout << "Enter the name of the song to delete: ";
    cin >> songToDelete;

    ifstream inFile("song.txt");
    ofstream outFile("temp.txt");
    string line;
    bool found = false;

    while (getline(inFile, line)) {
        if (line.find(songToDelete) == string::npos) {
            outFile << line << endl;
        } else {
            found = true;
        }
    }

    inFile.close();
    outFile.close();
    remove("song.txt");
    rename("temp.txt", "song.txt");

    if (found)
        cout << "Song deleted successfully.\n";
    else
        cout << "No song found with that name.\n";

    cout << "\n\nPress any key to continue!!";
    getch();
}

void playlist::play() {
    cout << "\n\t\t\tYour Playlist\n";
    cout << "\t\t\t-----------------------\n";
    cout << "\nSUGGESTIONS:\n";
    cout << "1. This is What Winter Feels Like\n";
    cout << "2. Golden Hour\n";
    cout << "3. Night Changes\n";
    cout << "4. Legends Never Die\n";
    cout << "\n\nSongs in your playlist:\n";

    ifstream filestream("song.txt");
    if (filestream.is_open()) {
        string line;
        while (getline(filestream, line)) {
            cout << line << endl;
        }
        filestream.close();
    }

    cout << "\n\nPress any key to continue!!";
    getch();
}

void playlist::genre() {
    cout << "\nAvailable Genres:\n";
    cout << "1. Classical\n2. Pop\n3. Rock\n4. Jazz\n5. Folk\n";
    cout << "Select your favorite genre: ";
    string g;
    cin >> g;
    cout << "\nGenre " << g << " selected successfully!\n";
    getch();
}

// --------------------------- MAIN FUNCTION ---------------------------
int main() {
    Login g;
    playlist p;

    cout << "\n\n";
    time_delay();
    cout << "\n\nPress any key to continue!!";
    getch();

    char id[20], pass[20];
    cout << "\n\n\t\t\tLogin Panel";
    cout << "\n\n\t\t\tUsername => ";
    cin >> id;
    cout << "\n\t\t\tPassword => ";
    cin >> pass;

    cout << "\n\nConnecting...\n";
    time_delay();

    if (strcmp(id, "admin") == 0 && strcmp(pass, "***") == 0)
        cout << "\n\n\t\t\t!!! Login Successful !!!";
    else {
        cout << "\n\n\t\t\t!!! INVALID CREDENTIALS !!!";
        getch();
        exit(-1);
    }

    g.check();
    p.menu();

    getch();
    return 0;
}

