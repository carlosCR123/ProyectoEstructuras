package com.cenfotec.westerosmap.repositories;

import com.cenfotec.westerosmap.entities.Location;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ILocationRepository extends JpaRepository<Location, Long> {
    Location findByName(String name);
}
