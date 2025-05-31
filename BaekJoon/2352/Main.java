import java.util.Scanner;

class connection {
    int outgoing_ports[];
    int ports;

    connection(int ports, Scanner in) {
        CheckPortNumber(ports);
        this.ports = ports;
        outgoing_ports = new int[ports];
        for(int i = 0; i < ports; i++) {
            if (!in.hasNextInt()) {
                System.out.println("Insufficient input.");
                System.exit(0);
            }
            int port_num = in.nextInt();
            CheckPortNumber(port_num);
            outgoing_ports[i] = port_num;
        }
    }

    void CheckPortNumber(int port_number) {
        if (port_number < 1 || port_number > 40000) {
            System.out.println("Invalid port number");
            System.exit(0);
        }
    }

    int conn_not_crossed() {
        int[] ports_connected = new int[ports];
        int increasing_length = 0;
        for (int port : outgoing_ports) {
            int left = 0, right = increasing_length;
            int mid;
            while (left < right) {
                mid = (left + right) / 2;
                if (port < ports_connected[mid]) {
                    right = mid;
                } else {
                    left = mid + 1;
                }
            }
            ports_connected[left] = port;
            if (left == increasing_length) increasing_length++;
        }
        return increasing_length;
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int ports = sc.nextInt();
        connection conn = new connection(ports, sc);
        int result = conn.conn_not_crossed();
        System.out.println(result);
    }
}

