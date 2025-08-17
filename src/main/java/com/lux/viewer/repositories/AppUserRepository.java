package com.lux.viewer.repositories;

import com.lux.viewer.models.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

// all the methods will be implemented by spring
@Repository
public interface AppUserRepository extends JpaRepository<AppUser, Long> {
    List<AppUser> findAppUserByUsername(String username);

}
