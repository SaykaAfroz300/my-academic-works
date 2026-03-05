// Online C++ compiler to run C++ program online
#include <iostream>
using namespace std;

class Guesser
{
    int guessednum;

public:
    int takegueeserinput()
    {
        int x;
        cout << "give the number for the guesser : " << endl;
        cin >> x;
        guessednum = x;
        return guessednum;
    }
};
class Player
{
    int playernum;

public:
    int takeplayerinput()
    {
        int p;
        // cout<<"Give the number for player"<<":"<<endl;
        cin >> p;
        playernum = p;
        return playernum;
    }
};
class Umpire
{
public:
    int g;
    int p1num;
    int p2num;
    int p3num;

public:
    void GetTheNumberFromGuesser()
    {
        Guesser g1;
        g = g1.takegueeserinput();
    }
    void GetTheNumberFromplayers()
    {
        Player p1;
        Player p2;
        Player p3;
        cout << "Give the number for player 1:" << endl;
        p1num = p1.takeplayerinput();
        cout << "Give the number for player 2:" << endl;
        p2num = p2.takeplayerinput();
        cout << "Give the number for player 3:" << endl;
        p3num = p3.takeplayerinput();
    }
    void PrintTheResult()
    {
        // g p1num p2num p3num
        if (g == p1num)
        {
            // p1 has won
            // p2 ? p3 ?
            if (g == p2num)
            {
                // p1 has won p2 has won
                // p3 ?
                if (g == p3num)
                {
                    cout << "All players won the game" << endl;
                }
                else
                {
                    // p1 has won p2 has won p3 has lost
                    cout << "The players 1 and 2 has won the game" << endl;
                }
            }
            else
            {
                // p1 has won and p2 has lost the game
                if (g == p3num)
                {
                    cout << "The players 1 and 3 has won the game" << endl;
                }
                else
                {
                    // p1 has won p2 has won p3 has lost
                    cout << "The players 1 has won the game" << endl;
                }
            }
        }
        else if (g == p2num)
        {
            // p1 has not won p2 has won--> already know
            // test for p3 -> test
            if (p3num == g)
            {
                // p1 has lost p2 has won p3 has also won as we checked-->already know
                cout << "The players 2 and 3 has won the game" << endl;
            }
            else
            {
                // p1 has lost p2 has won p3 has lost--> already know
                cout << "The player 2 has won the game" << endl;
            }
        }
        else if (g == p3num)
        {
            // p1 has not won p2 has not won p3 has won --> already won

            cout << "player 3 has won the game" << endl;
        }
        else
        {
            // p1 has not won, p2 has not won p3 has won--> already know
            cout << "All the players have lost the game" << endl;
        }
    }
};

int main()
{
    // Write C++ code here
    cout << "let's start the game" << endl;
    Umpire u;
    u.GetTheNumberFromGuesser();
    u.GetTheNumberFromplayers();
    u.PrintTheResult();

    cout << ".......end game......" << endl;

    return 0;
}