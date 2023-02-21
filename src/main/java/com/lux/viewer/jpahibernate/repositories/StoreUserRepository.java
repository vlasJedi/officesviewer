package com.lux.viewer.jpahibernate.repositories;

import com.lux.viewer.jpahibernate.models.StoreUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StoreUserRepository extends JpaRepository<StoreUser, Long> {
}
