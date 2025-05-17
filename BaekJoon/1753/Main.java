import java.util.ArrayList;
import java.util.Scanner;
import java.util.PriorityQueue;
import java.util.Arrays;
import java.util.List;

class DirectedGraph {
    public static final int INF = 10000000;
    private int[] label;
    private List<List<Edge>> adjacentNodes;
    private boolean[] visited;

    private static class Edge {
        int depart;
        int to;
        int weight;

        Edge(int depart, int to, int weight) {
            this.to = to;
            this.weight = weight;
            this.depart = depart;
        }
    }

    public DirectedGraph(int graphSize) {
        label = new int[graphSize];
        adjacentNodes = new ArrayList<>();
        visited = new boolean[graphSize];

        for (int i = 0; i < graphSize; i++) {
            label[i] = i + 1;
            visited[i] = false;
            adjacentNodes.add(new ArrayList<>());
        }
    }

    private void CheckIndex(int idx) {
        if (idx < 0 || idx > label.length - 1) {
            System.out.println("Invalid Index.");
            System.exit(-1);
        }
    }

    public void InsertEdge(int depart, int arr, int dist) {
        CheckIndex(depart);
        CheckIndex(arr);
        adjacentNodes.get(depart).add(new Edge(depart, arr, dist));
    }

    public void ResetVisited() {
        Arrays.fill(visited, false);
    }

    public int[] Dijkstra(int src) {
        ResetVisited();
        int[] distance = new int[label.length];
        Arrays.fill(distance, INF); //배열 INF로 채우기
        distance[src] = 0; //1번에서 1번까지의 거리는 0

        PriorityQueue<int[]> pq = new PriorityQueue<>(
                (a, b) -> Integer.compare(a[0], b[0])
        );
        pq.add(new int[]{0, src});

        while (!pq.isEmpty()) {
            int[] current = pq.poll();
            int currentDist = current[0]; //dist
            int currentVertex = current[1]; //vertex
            if (visited[currentVertex]) continue;
            visited[currentVertex] = true;

            for (Edge edge : adjacentNodes.get(currentVertex)) {
                int v = edge.to;
                int cost = edge.weight;

                if (!visited[v] && distance[currentVertex] + cost < distance[v]) {
                    distance[v] = distance[currentVertex] + cost;
                    pq.add(new int[]{distance[v], v});
                }
            }

        }
        return distance;
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        int vertex = sc.nextInt();
        int edge = sc.nextInt();
        int departure = sc.nextInt();
        int u, v, w;
        DirectedGraph graph = new DirectedGraph(vertex);

        for (int i = 0; i < edge; i++) {
            u = sc.nextInt();
            v = sc.nextInt();
            w = sc.nextInt();
            if ((u == v || u > vertex || u < 1) || (v > vertex || v < 1) || (w < 1 || w > 10)) {
                System.out.println("Invalid value.");
                return;
            }
            graph.InsertEdge(u - 1, v - 1, w);
        }

        if ((vertex > 20000 || vertex < 1) || (edge < 1 || edge > 300000)) {
            System.out.println("Invalid Value.");
            return;
        }

        if (departure < 1 || departure > vertex) {
            System.out.println("Invalid departure.");
            return;
        }

        int[] ShortestPath = graph.Dijkstra(departure - 1);
        for (int i = 0; i < vertex; i++) {
            if (ShortestPath[i] == DirectedGraph.INF) {
                System.out.println("INF");
            } else {
                System.out.println(ShortestPath[i]);
            }
        }

    }
}
