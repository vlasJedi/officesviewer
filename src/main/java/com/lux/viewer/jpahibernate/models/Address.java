package com.lux.viewer.jpahibernate.models;

// value type class that does not own identity
// User is owing side as composition
public class Address {
    private StoreUser user;

    // force composition that this user can't be changed externally
    public Address(StoreUser user) {

    }

    // provide the constr for Hibernate
    protected Address() {}
}
