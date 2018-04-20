package com.cenfotec.westerosmap.web;

import com.cenfotec.westerosmap.entities.Location;
import com.cenfotec.westerosmap.entities.Route;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
public class MapController {

    @Autowired
    MapServiceManager serviceManager;



    @RequestMapping(method = RequestMethod.GET, value = "/allLocations")
    @ResponseBody
    List<Location> getAllLocations(HttpServletResponse res){
        List<Location> locations = serviceManager.getAllLocations();
        if (locations != null) return locations;
        res.setStatus(HttpServletResponse.SC_NO_CONTENT);
        return null;
    }

    @RequestMapping(method = RequestMethod.GET, value = "/allRoutes")
    @ResponseBody
    List<Route> getAllRoutes(HttpServletResponse res){
        List<Route> routes = serviceManager.getAllRoutes();
        if(routes != null) return routes;
        res.setStatus(HttpServletResponse.SC_NO_CONTENT);
        return null;
    }

    @RequestMapping(method = RequestMethod.POST, value = "/routesLocation")
    @ResponseBody
    List<Route> getRoutesOfLocation(HttpServletResponse res, @RequestBody Location location){
        List<Route> routes = serviceManager.getRoutesOfLocation(location);
        if(routes != null) return routes;
        res.setStatus(HttpServletResponse.SC_NO_CONTENT);
        return null;
    }

    @RequestMapping(method = RequestMethod.POST, value = "/neighborLocations")
    @ResponseBody
    List<Location> getNeighborLocations(HttpServletResponse res, @RequestBody Location location){
        List<Location> locations = serviceManager.getNeighborLocations(location);
        if (locations != null) return locations;
        res.setStatus(HttpServletResponse.SC_NO_CONTENT);
        return null;
    }

}
