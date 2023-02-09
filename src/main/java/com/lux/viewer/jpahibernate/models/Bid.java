package com.lux.viewer.jpahibernate.models;

import jakarta.persistence.Access;
import jakarta.persistence.AccessType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotNull;

// users can make bids on some items
// any bid is associated with one item
@Entity
public class Bid {
    @Id
    @GeneratedValue(generator = "ID_GENERATOR")
    private Long id;

    // bidirectional ref
    // this anno is not required as @Id already set on field
    @Access(AccessType.FIELD)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ITEM_ID")
    @NotNull
    protected Item item;

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
