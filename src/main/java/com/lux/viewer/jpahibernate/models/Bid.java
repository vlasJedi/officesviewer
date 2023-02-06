package com.lux.viewer.jpahibernate.models;

import jakarta.persistence.*;

// users can make bids on some items
// any bid is associated with one item
@Entity
public class Bid {
    // bidirectional ref
    @Access(AccessType.FIELD)
    @ManyToOne
    protected Item item;
    @Id
    @GeneratedValue(generator = "ID_GENERATOR")
    private Long id;

    public Item getItem() {
        return item;
    }
    // make it package visible to protect from not correct setting
    // relationship management!
    // this method can be called only from Bid
    void setItem(Item item) {
        this.item = item;
    }

    public Long getId() {
        return id;
    }
}
