package com.cenfotec.westerosmap.datastructures;

import com.cenfotec.westerosmap.entities.Route;

public class GraphArc {
    private Route data;

    public GraphArc(Route data) {
        this.data = data;
    }

    public Route getData() {
        return data;
    }

    public void setData(Route data) {
        this.data = data;
    }

}
