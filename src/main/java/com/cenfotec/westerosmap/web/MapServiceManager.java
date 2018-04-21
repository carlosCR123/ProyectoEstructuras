package com.cenfotec.westerosmap.web;

import com.cenfotec.westerosmap.datastructures.Graph;
import com.cenfotec.westerosmap.datastructures.GraphArc;
import com.cenfotec.westerosmap.datastructures.GraphVertex;
import com.cenfotec.westerosmap.entities.Location;
import com.cenfotec.westerosmap.entities.Route;
import com.cenfotec.westerosmap.repositories.ILocationRepository;
import com.cenfotec.westerosmap.repositories.IRouteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MapServiceManager {

    @Autowired
    ILocationRepository locationRepository;

    @Autowired
    IRouteRepository routeRepository;

    public List<Location> getAllLocations(){
        List<Location> locations =  locationRepository.findAll();
        if(!locations.isEmpty()){
            return locations;
        }
        return null;
    }

    public List<Route> getAllRoutes(){
        List<Route> routes = routeRepository.findAll();
        if(!routes.isEmpty()){
            return routes;
        }
        return null;
    }

    public List<Route> getRoutesOfLocation(Location location){
        Location fullLocation = locationRepository.findByName(location.getName());
        if(fullLocation != null){
            List<Route> routes = routeRepository.findRoutesOfLocationByLocationID(fullLocation.getId());
            if(!routes.isEmpty()){
                return routes;
            }
        }
        return null;
    }

    public List<Location> getNeighborLocations(Location location){
        Location fullLocation = locationRepository.findByName(location.getName());
        if(fullLocation != null){
            List<Route> routes = routeRepository.findRoutesOfLocationByLocationID(fullLocation.getId());
            List<Location> locations = new ArrayList<>();
            if(!routes.isEmpty()){
                for (Route route : routes) {
                    if(route.getLocationOne().getId() == fullLocation.getId()){
                        locations.add(route.getLocationTwo());
                    }else{
                        locations.add(route.getLocationOne());
                    }
                }
                return locations;
            }
        }
        return null;
    }

    public Location getLocationByName(Location location){
        return locationRepository.findByName(location.getName());
    }

    public List<Route> getShortestPath(Location origin, Location destiny){
        origin = locationRepository.findByName(origin.getName());
        destiny = locationRepository.findByName(destiny.getName());
        if(origin != null && destiny != null){
            List<Location> allLocations = locationRepository.findAll();
            origin = replaceLocationWithObjectInList(origin, allLocations);
            destiny = replaceLocationWithObjectInList(destiny, allLocations);
            Graph graph = initilizeGraph(allLocations);
            GraphVertex originVertex = findVertexFromLocation(graph.getVertexes(), origin);
            GraphVertex destinyVertex = findVertexFromLocation(graph.getVertexes(), destiny);
            return graph.findShortestPath(originVertex, destinyVertex);
        }
        return null;
    }

    private GraphVertex findVertexFromLocation(ArrayList<GraphVertex> vertexes, Location location) {
        for (GraphVertex vertex : vertexes) {
            if(location.getId() == vertex.getData().getId()) return vertex;
        }
        return null;
    }

    private Graph initilizeGraph(List<Location> allLocations) {
        Graph graph = new Graph();
        for (Location location : allLocations) {
            ArrayList<GraphArc> arcs = new ArrayList<>();
            List<Route> routesOfLocation = routeRepository.findRoutesOfLocationByLocationID(location.getId());
            for (Route route : routesOfLocation) {
                arcs.add(new GraphArc(route));
            }
            GraphVertex vertex = new GraphVertex(location, arcs);
            graph.insertVertex(vertex);
        }
        return graph;
    }

    private Location replaceLocationWithObjectInList(Location object, List<Location> list){
        for (Location item : list) {
            if(object.getId() == item.getId()){
                return item;
            }
        }
        return object;
    }



}
