package com.hms.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.model.Doctor;
import com.hms.repository.DoctorRepository;

@Service
public class DoctorService {
	
	@Autowired
	private DoctorRepository doctorRepository;
	
	public Doctor addDoctor(Doctor doctor) {
		return doctorRepository.save(doctor);
	}
	
	public List<Doctor> getAllDoctors(){
		return doctorRepository.findAll();
	}
	
	public Doctor getDoctorByID(Long id) {
		return doctorRepository.findById(id).orElseThrow(() -> new RuntimeException("Doctor not found"));
	}
	
	public Doctor updateDoctor(Long id, Doctor doctor) {
        Doctor existing = getDoctorByID(id);

        existing.setName(doctor.getName());
        existing.setSpecialization(doctor.getSpecialization());
        existing.setEmail(doctor.getEmail());
        existing.setExperience(doctor.getExperience());
        existing.setGender(doctor.getGender());
        existing.setPhone(doctor.getPhone());
        

        return doctorRepository.save(existing);
    }
	
	public void deleteDoctor(Long id) {
        doctorRepository.deleteById(id);
    }

}
