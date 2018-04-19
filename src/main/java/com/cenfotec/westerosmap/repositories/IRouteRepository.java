package com.cenfotec.westerosmap.repositories;

import com.cenfotec.westerosmap.entities.Route;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IRouteRepository extends JpaRepository<Route, Long> {
    @Query(value = "SELECT DISTINCT(r.id), r.trip_duration, r.location_one, r.location_two FROM route r WHERE r.location_one = ?1 OR r.location_two = ?1", nativeQuery = true)
    List<Route> findByLocationOrigin(long idLocation);
}
