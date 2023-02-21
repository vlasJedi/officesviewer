package com.lux.viewer.jpahibernate.repositories;

import com.lux.viewer.jpahibernate.models.StoreUserDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StoreUserDetailsRepository extends JpaRepository<StoreUserDetails, Long> {
}
