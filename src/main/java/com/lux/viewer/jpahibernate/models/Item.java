package com.lux.viewer.jpahibernate.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import java.util.Collections;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

// item in store that used for bidding
// has list of associated bids
@Entity
// can be used from spring's repo due to prefix Item.
@NamedQuery(
        name = "Item.findItemsOrderByName",
        query = "select i from Item i order by i.name asc"
)
//@NamedQuery(
//        name = "Item.findItemBuyNowPriceGreaterThan",
//        query = "select i from Item i where i.buyNowPrice > :price"
//)
@org.hibernate.annotations.Cache(usage = CacheConcurrencyStrategy.READ_WRITE)

public class Item {
    // bidirectional ref
    @Access(AccessType.FIELD)
    @OneToMany
    protected Set<Bid> bids = new HashSet<>();

    // jpa validation
    private String name;

    // datetime should be in future
    protected Date auctionEnd;

    @Id
    @GeneratedValue(generator = "ID_GENERATOR")
    private Long id;

    public Long getId() {
        return id;
    }

    @Future
    public Date getAuctionEnd() {
        return auctionEnd;
    }

    public void setAuctionEnd(Date auctionEnd) {
        this.auctionEnd = auctionEnd;
    }

    @NotNull
    @Size(
            min = 2,
            max = 255,
            message = "Name is required, maximum 255 characters."
    )
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    /**
     * Provides unmodifiable set of bids for the Item
     */
    public Set<Bid> getBids() {
        return Collections.unmodifiableSet(bids);
    }
    // make it private, so it is not possible to change it in arbitrary
    // hibernate will access it directly
    // relationship management!
    private void setBids(Set<Bid> bids) {
        this.bids = bids;
    }

    public void addBid(Bid bid) {
        // defensive behavior to do not allow intermediate changes
        if (bid == null)
            throw new NullPointerException("Can't add null Bid");
        if (bid.getItem() != null)
            throw new IllegalStateException("Bid is already assigned to an Item");
        // this should be atomic or rollback
        getBids().add(bid);
        bid.setItem(this);
    }
}
