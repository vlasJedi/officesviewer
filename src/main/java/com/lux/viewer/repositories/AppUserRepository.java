package com.lux.viewer.repositories;

import com.lux.viewer.models.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

// all the methods will be implemented by spring
@Repository
public interface AppUserRepository extends JpaRepository<AppUser, Long> {

}
