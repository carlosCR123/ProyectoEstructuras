package com.cenfotec.westerosmap.entities;

import javax.persistence.*;

@Entity
public class Route {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false)
    private int tripDuration;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "location_one")
    private Location locationOne;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "location_two")
    private Location locationTwo;

    public Route(int tripDuration) {
        this.tripDuration = tripDuration;
    }

    public Route() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getTripDuration() {
        return tripDuration;
    }

    public void setTripDuration(int tripDuration) {
        this.tripDuration = tripDuration;
    }

    public Location getLocationOne() {
        return locationOne;
    }

    public void setLocationOne(Location locationOne) {
        this.locationOne = locationOne;
    }


    public Location getLocationTwo() {
        return locationTwo;
    }

    public void setLocationTwo(Location locationTwo) {
        this.locationTwo = locationTwo;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Route )) return false;
        return id != null && id.equals(((Route) o).id);
    }
    @Override
    public int hashCode() {
        return 31;
    }
}
