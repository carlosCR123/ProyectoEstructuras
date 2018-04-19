package com.cenfotec.westerosmap.datastructures;

import com.cenfotec.westerosmap.utils.Dijkstra;

import java.util.ArrayList;
import java.util.Map;

public class Graph {

    private ArrayList<GraphVertex> vertexes;

    public Graph() {
        this.vertexes = new ArrayList<>();
    }

    public boolean insertVertex(GraphVertex vertex){
        if(!getVertexes().contains(vertex)){
            getVertexes().add(vertex);
            return true;
        }
        return false;
    }

    public ArrayList<Map> findShortestPath(GraphVertex origin, GraphVertex destiny){
        return new Dijkstra(this).execute(origin);

    }




    public ArrayList<GraphVertex> getVertexes() {
        return vertexes;
    }

    public void setVertexes(ArrayList<GraphVertex> vertexes) {
        this.vertexes = vertexes;
    }
}
