package com.lux.viewer.jpahibernate.repositories;

import com.lux.viewer.jpahibernate.models.Bid;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BidRepository extends JpaRepository<Bid, Long> {
}
