package com.hms.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hms.model.Bill;

public interface BillRepository extends JpaRepository<Bill, Long> {
	

    List<Bill> findByPatientId(Long patientId);

    List<Bill> findByDoctorId(Long doctorId);

}
