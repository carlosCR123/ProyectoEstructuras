package com.cenfotec.westerosmap.repositories;

import com.cenfotec.westerosmap.entities.Route;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IRouteRepository extends JpaRepository<Route, Long> {
}
