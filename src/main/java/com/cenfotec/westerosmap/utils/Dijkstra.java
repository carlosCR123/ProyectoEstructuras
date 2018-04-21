package com.cenfotec.westerosmap.utils;

import com.cenfotec.westerosmap.datastructures.Graph;
import com.cenfotec.westerosmap.datastructures.GraphArc;
import com.cenfotec.westerosmap.datastructures.GraphVertex;
import com.cenfotec.westerosmap.entities.Location;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class Dijkstra {
    private final ArrayList<GraphVertex> nodes;

    private ArrayList<GraphVertex> visited;
    private ArrayList<GraphVertex> unVisited;
    private HashMap<GraphVertex, GraphVertex> predecessors;
    private HashMap<GraphVertex, Integer> distance;

    public Dijkstra(Graph graph) {
        this.nodes = new ArrayList<>(graph.getVertexes());
        this.visited = null;
        this.unVisited = null;
        this.predecessors = null;
        this.distance = null;
    }

    public HashMap<GraphVertex, GraphVertex> execute(GraphVertex origin){
        GraphVertex current;
        visited = new ArrayList<>();
        unVisited = new ArrayList<>(nodes);
        fillDitanceHashMapWithInitialValues(origin);
        fillPredecessorsWithInitialValues();
        while (unVisited.size() > 0){
            current = findNodeWithSmallestKnownDistanceFromOrigin();
            for (int i = 0; i < current.getArcs().size() ; i++) {
                GraphArc currentArc = current.getArcs().get(i);
                GraphVertex neighbor;
                if(current.getData().getId() == currentArc.getData().getLocationOne().getId()){
                    neighbor = findGraphVertexFromLocation(currentArc.getData().getLocationTwo());
                }else{
                    neighbor = findGraphVertexFromLocation(currentArc.getData().getLocationOne());
                }
                if(distance.get(current) + currentArc.getData().getTripDuration() < distance.get(neighbor)){
                    predecessors.replace(neighbor, current);
                    distance.replace(neighbor, distance.get(current) + currentArc.getData().getTripDuration());
                }
            }
            updateNodeLists(current);
        }
        return predecessors;
    }

    private GraphVertex findGraphVertexFromLocation(Location location) {
        for (GraphVertex item : nodes) {
            if(item.getData().getId() == location.getId()){
                return item;
            }
        }
        return null;
    }

    private GraphVertex findNodeWithSmallestKnownDistanceFromOrigin() {
        GraphVertex selected = null;
        int smallest = Integer.MAX_VALUE;
        for (GraphVertex item : nodes) {
            int currentDistance = distance.get(item);
            if(smallest > currentDistance && unVisited.contains(item)){
                selected = item;
            }
        }
        return selected;
    }

    private void updateNodeLists(GraphVertex current) {
        visited.add(current);
        unVisited.remove(current);
    }

    private void fillPredecessorsWithInitialValues() {
        predecessors = new HashMap<>();
        for (GraphVertex item : nodes) {
            predecessors.put(item, null);
        }
    }

    private void fillDitanceHashMapWithInitialValues(GraphVertex origin) {
        distance = new HashMap<>();
        for (GraphVertex item : nodes) {
            distance.put(item, Integer.MAX_VALUE);
        }
        distance.replace(origin, 0);
    }


}
