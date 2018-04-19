package com.cenfotec.westerosmap.datastructures;

import com.cenfotec.westerosmap.entities.Location;

import java.util.ArrayList;

public class GraphVertex {
    private Location data;
    private ArrayList<GraphArc> arcs;

    public GraphVertex(Location data, ArrayList<GraphArc> vertexes) {
        this.data = data;
        this.arcs = vertexes;
    }

    public Location getData() {
        return data;
    }

    public void setData(Location data) {
        this.data = data;
    }

    public ArrayList<GraphArc> getArcs() {
        return arcs;
    }

    public void setArcs(ArrayList<GraphArc> arcs) {
        this.arcs = arcs;
    }
}
