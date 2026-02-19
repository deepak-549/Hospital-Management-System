package com.hms.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hms.model.Bed;

public interface BedRepository extends JpaRepository<Bed, Long> {
	
	long countByRoomId(Long roomId);

}
