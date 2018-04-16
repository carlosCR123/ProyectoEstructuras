package com.cenfotec.westerosmap.web;

import com.cenfotec.westerosmap.entities.Location;
import com.cenfotec.westerosmap.entities.Route;
import com.cenfotec.westerosmap.repositories.ILocationRepository;
import com.cenfotec.westerosmap.repositories.IRouteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
public class MapController {

    @Autowired
    ILocationRepository locationRepository;

    @Autowired
    IRouteRepository routeRepository;

    @RequestMapping(method = RequestMethod.GET, value = "/testLoc")
    @ResponseBody
    List<Location> getAllLocations(HttpServletResponse res){
        List<Location> locations = locationRepository.findAll();
        if(!locations.isEmpty()){
            return locations;
        }
        res.setStatus(HttpServletResponse.SC_NO_CONTENT);
        return null;
    }

    @RequestMapping(method = RequestMethod.GET, value = "/testRou")
    @ResponseBody
    List<Route> getAllRoutes(HttpServletResponse res){
        List<Route> routes = routeRepository.findAll();
        if(!routes.isEmpty()){
            return routes;
        }
        res.setStatus(HttpServletResponse.SC_NO_CONTENT);
        return null;
    }



}
