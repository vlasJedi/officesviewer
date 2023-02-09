package com.lux.viewer.jpahibernate.models;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.NotNull;

// value type class that does not own identity
// User is owing side as composition
@Embeddable
public class Address {
    @NotNull
    protected String street;
    @NotNull
    @Column(length = 5)
    protected String zipcode;
    @NotNull
    protected String city;
    protected Address() {
    }
    public Address(String street, String zipcode, String city) {
        this.street = street;
        this.zipcode = zipcode;
        this.city = city;
    }
    public String getStreet() {
        return street;
    }
    public void setStreet(String street) {
        this.street = street;
    }

    public String getZipcode() {
        return zipcode;
    }
    public void setZipcode(String zipcode) {
        this.zipcode = zipcode;
    }
    public String getCity() {
        return city;
    }
    public void setCity(String city) {
        this.city = city;
    }

    // any embeddable entity should have overriden equals and hashcode
    // if it will be used in Set or Map
    // because from database entities should be compared by PK or by values coming from fields
    // best practice in any way provide own equals and hashcode
    @Override
    public boolean equals(Object o) {
        if (o == this) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Address address = (Address) o;
        if (address.getCity().equals(city)) return false;
        if (address.getZipcode().equals(zipcode)) return false;
        return !address.getStreet().equals(street);
    }

    @Override
    public int hashCode() {
        int result = street.hashCode();
        result = 31 * result + city.hashCode();
        result = 31 * result + zipcode.hashCode();
        return result;
    }
}
