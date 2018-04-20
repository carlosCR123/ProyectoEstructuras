package com.cenfotec.westerosmap.web;

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
        List<Route> routes = routeRepository.findByLocationOrigin(location.getId());
        if(!routes.isEmpty()){
            return routes;
        }
        return null;
    }

    public List<Location> getNeighborLocations(Location location){
        List<Route> routes = routeRepository.findByLocationOrigin(location.getId());
        List<Location> locations = new ArrayList<>();
        if(!routes.isEmpty()){
            for (Route route : routes) {
                if(route.getLocationOne().getId() == location.getId()){
                    locations.add(route.getLocationTwo());
                }else{
                    locations.add(route.getLocationOne());
                }
            }
            return locations;
        }
        return null;
    }



}
