package com.hms.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.hms.model.Appointment;
import com.hms.model.Patient;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
	
	Appointment getByPatient(Patient patient);
	
}