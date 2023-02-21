package com.lux.viewer.jpahibernate.models;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;

@Entity
public class StoreUserDetails {
    @Id
    @GeneratedValue(generator = "ID_GENERATOR")
    // @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String details;

    // @OneToOne(mappedBy = "storeUserDetails", fetch = FetchType.LAZY)
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @MapsId
    //@JoinColumn(name = "user_id")
    private StoreUser storeUser;

    public StoreUser getStoreUser() {
        return storeUser;
    }

    public void setStoreUser(StoreUser storeUser) {
        this.storeUser = storeUser;
    }


    public Long getId() {
        return id;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }
}
