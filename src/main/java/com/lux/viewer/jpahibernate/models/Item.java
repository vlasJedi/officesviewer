package com.lux.viewer.jpahibernate.models;

import jakarta.persistence.Access;
import jakarta.persistence.AccessType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotNull;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import java.util.Collections;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

// item in store that used for bidding
// has list of associated bids
@Entity
// can be used from spring's repo due to prefix Item.
//@NamedQuery(
//        name = "Item.findItemsWithRelatedBids",
//        query = "select i from Item i left join fetch i.bids"
//)
//@NamedQuery(
//        name = "Item.findItemBuyNowPriceGreaterThan",
//        query = "select i from Item i where i.buyNowPrice > :price"
//)
@org.hibernate.annotations.Cache(usage = CacheConcurrencyStrategy.READ_WRITE)

public class Item {
    // by default now hibernate will try access all fields
    // not by getter methods
    @Id
    @GeneratedValue(generator = "ID_GENERATOR")
    private Long id;
    // bidirectional ref
    // this is just for example as it is already field due to @id place
    @Access(AccessType.FIELD)
    @OneToMany(
            mappedBy = "item",
            fetch = FetchType.LAZY//,
            // cascade = {CascadeType.PERSIST, CascadeType.REMOVE}
    )
    @NotNull
    protected Set<Bid> bids = new HashSet<>();

    // jpa validation
//    @NotNull
//    @Size(
//            min = 2,
//            max = 255,
//            message = "Name is required, maximum 255 characters."
//    )
    private String name;

    // datetime should be in future
//    @Future
//    @NotNull
    protected Date auctionEnd;

//    @ElementCollection
//    @CollectionTable(name = "IMAGE")
//    @AttributeOverride(
//            name = "filename",
//            column = @Column(name = "FNAME", nullable = false)
//    )
//    protected Set<Image> images = new HashSet<Image>();

    public Long getId() {
        return id;
    }

    public Date getAuctionEnd() {
        return auctionEnd;
    }

    public void setAuctionEnd(Date auctionEnd) {
        this.auctionEnd = auctionEnd;
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
    public void setBids(Set<Bid> bids) {
        this.bids = bids;
    }

//    public void addBid(Bid bid) {
//        // defensive behavior to do not allow intermediate changes
//        if (bid == null)
//            throw new NullPointerException("Can't add null Bid");
//        if (bid.getItem() != null)
//            throw new IllegalStateException("Bid is already assigned to an Item");
//        // this should be atomic or rollback
//        getBids().add(bid);
//        bid.setItem(this);
//    }
}
