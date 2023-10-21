package com.lux.viewer.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

import java.util.List;

@Entity
@Table(name = "ROLE")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    // class field name of associated entity
    @ManyToMany(mappedBy = "roles")
    // during serial to json this field is excluded
//    @JsonBackReference
    @JsonIgnore
    private List<AppUser> appUserList;

    @Column(name = "role_name", unique = true, nullable = false)
    // tries to use string representation instead of indexes
    @Enumerated(EnumType.STRING)
    private RoleEnum roleName;

    public RoleEnum getRoleName() {
        return roleName;
    }

    public void setRoleName(RoleEnum roleName) {
        this.roleName = roleName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<AppUser> getAppUserList() {
        return appUserList;
    }

    public void setAppUserList(List<AppUser> appUserList) {
        this.appUserList = appUserList;
    }
}
