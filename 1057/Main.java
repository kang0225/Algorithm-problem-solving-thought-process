import java.util.Scanner;

class Tournament {
    int num_players;
    int player1;
    int player2;
    Tournament(int num_p, int p1, int p2) {
        num_players = num_p;
        player1 = p1;
        player2 = p2;
    }

    void CheckValue() {
        if ((num_players < 2 || num_players > 100000)
                || (player1 < 1 || player1 > num_players)
                || (player2 < 1 || player2 > num_players)
                || (player1 == player2)) {
            System.out.println("Invalid values");
            System.exit(0);
        }
    }

    int getRound() {
        int round = 1;
        while (num_players > 1) {
            player1 = (player1 + 1) / 2;
            player2 = (player2 + 1) / 2;

            if (player1 == player2) {
                return round;
            }
            round++;
            if (((player1 % 2 == 1) && (player1 + 1 == player2))
                || ((player1 % 2 == 0) && (player1 - 1 == player2))) {
                return round;
            }
        }
        return -1;
    }
}
public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Tournament tournament = new Tournament(scanner.nextInt(), scanner.nextInt(), scanner.nextInt());
        tournament.CheckValue();
        System.out.println(tournament.getRound());
    }
}
