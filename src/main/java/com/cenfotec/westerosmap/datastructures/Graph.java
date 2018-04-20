package com.cenfotec.westerosmap.datastructures;

import com.cenfotec.westerosmap.entities.Route;
import com.cenfotec.westerosmap.utils.Dijkstra;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

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

    public List<Route> findShortestPath(GraphVertex origin, GraphVertex destiny){
        HashMap<GraphVertex, GraphVertex> predecessors =  new Dijkstra(this).execute(origin);
        return findPathFromOriginToDestiny(predecessors, origin, destiny);

    }

    private List<Route> findPathFromOriginToDestiny(HashMap<GraphVertex,GraphVertex> predecessors, GraphVertex origin, GraphVertex destiny) {
        List<Route> routeList = new ArrayList<>();
        GraphVertex aux = destiny;
        while (aux.getData().getId() != origin.getData().getId()){
            GraphVertex predVertex = predecessors.get(aux);
            for (GraphArc arcRoute : predVertex.getArcs()) {
                if((arcRoute.getData().getLocationOne().getId() == aux.getData().getId() && arcRoute.getData().getLocationTwo().getId() == predVertex.getData().getId()) || (arcRoute.getData().getLocationTwo().getId() == aux.getData().getId() && arcRoute.getData().getLocationOne().getId() == predVertex.getData().getId())){
                    routeList.add(arcRoute.getData());
                }
            }
            aux = predVertex;
        }
        return routeList.size() > 0 ? routeList : null;
    }


    public ArrayList<GraphVertex> getVertexes() {
        return vertexes;
    }

    public void setVertexes(ArrayList<GraphVertex> vertexes) {
        this.vertexes = vertexes;
    }
}
