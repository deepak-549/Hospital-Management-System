package com.hms.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.model.Doctor;
import com.hms.model.Patient;
import com.hms.repository.DoctorRepository;
import com.hms.repository.PatientRepository;

@Service
public class PatientService {
	
	 	@Autowired  
	    private PatientRepository patientRepository;

	 	@Autowired
	 	private DoctorRepository doctorRepository;
	   
	    public Patient addPatient(Patient patient) {
	    		
	        return patientRepository.save(patient);
	    }
	    
	    public List<Patient> getAllPatients() {
	        return patientRepository.findAll();
	    }
	    
	    public Patient getPatientById(Long id) {
	        return patientRepository.findById(id)
	                .orElseThrow(() -> new RuntimeException("Patient not found"));
	    }
	    
	    public Patient updatePatient(Long id, Patient patient) {
	        Patient existing = getPatientById(id);

	        existing.setName(patient.getName());
	        existing.setAge(patient.getAge());
	        existing.setGender(patient.getGender());
	        existing.setAddress(patient.getAddress());
	        existing.setBloodGroup(patient.getBloodGroup());
	        existing.setDisease(patient.getDisease());
	        existing.setPhone(patient.getPhone());
	        existing.setStatus(patient.getStatus());
	        if (patient.getDoctor() != null && patient.getDoctor().getId() != null) {

	            Doctor managedDoctor = doctorRepository
	                    .findById(patient.getDoctor().getId())
	                    .orElseThrow(() -> new RuntimeException("Doctor not found"));

	            existing.setDoctor(managedDoctor);

	        } else {
	            existing.setDoctor(null);
	        }
	        
	        return patientRepository.save(existing);
	    }
	    
	    public void deletePatient(Long id) {
	        patientRepository.deleteById(id);
	    }

}
