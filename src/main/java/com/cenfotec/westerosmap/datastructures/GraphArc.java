package com.cenfotec.westerosmap.datastructures;

import com.cenfotec.westerosmap.entities.Route;

public class GraphArc {
    private Route data;
    private GraphVertex origin;
    private GraphVertex destiny;

    public GraphArc(Route data, GraphVertex successor, GraphVertex predecessor) {
        this.data = data;
        this.origin = successor;
        this.destiny = predecessor;
    }

    public Route getData() {
        return data;
    }

    public void setData(Route data) {
        this.data = data;
    }

    public GraphVertex getOrigin() {
        return origin;
    }

    public void setOrigin(GraphVertex origin) {
        this.origin = origin;
    }

    public GraphVertex getDestiny() {
        return destiny;
    }

    public void setDestiny(GraphVertex destiny) {
        this.destiny = destiny;
    }
}
