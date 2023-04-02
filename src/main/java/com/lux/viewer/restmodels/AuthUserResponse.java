package com.lux.viewer.restmodels;

public class AuthUserResponse {
    private String username;

    public AuthUserResponse(String name) {
        this.username = name;
    }

    public AuthUserResponse() {
        this.username = "";
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
