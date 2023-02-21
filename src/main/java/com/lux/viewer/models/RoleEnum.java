package com.lux.viewer.models;

public enum RoleEnum {
    USER,
    ADMIN;

    public String toSpringRole() {
        return "ROLE_" + this;
    }
}
