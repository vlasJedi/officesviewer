package com.lux.viewer.jpahibernate.models;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.AttributeOverrides;
import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class StoreUser {
    @Id
    @GeneratedValue(generator = "ID_GENERATOR")
    // @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public Long getId() {
        return id;
    }

    protected Address homeAddress;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "street",
                    column = @Column(name = "BILLING_STREET")),
            @AttributeOverride(name = "zipcode",
                    column = @Column(name = "BILLING_ZIPCODE", length = 5)),
            @AttributeOverride(name = "city",
                    column = @Column(name = "BILLING_CITY"))
    })
    protected Address billingAddress;

//    public StoreUserDetails getStoreUserDetails() {
//        return storeUserDetails;
//    }
//
//    public void setStoreUserDetails(StoreUserDetails storeUserDetails) {
//        this.storeUserDetails = storeUserDetails;
//    }
//
//    @OneToOne(mappedBy = "storeUser",fetch = FetchType.LAZY)
//    // @PrimaryKeyJoinColumn
//    private StoreUserDetails storeUserDetails;

    public Address getBillingAddress() {
        return billingAddress;
    }

    public void setBillingAddress(Address billingAddress) {
        this.billingAddress = billingAddress;
    }

    public Address getHomeAddress() {
        return homeAddress;
    }

    public void setHomeAddress(Address homeAddress) {
        this.homeAddress = homeAddress;
    }
}
