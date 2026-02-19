package com.hms.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.model.Appointment;
import com.hms.model.Doctor;
import com.hms.model.Patient;
import com.hms.repository.AppointmentRepository;
import com.hms.repository.DoctorRepository;
import com.hms.repository.PatientRepository;

@Service
public class AppointmentService {
	
	@Autowired
	private AppointmentRepository appointmentRepository;
   
	@Autowired
    public PatientRepository patientRepository;
    
    @Autowired
    public DoctorRepository doctorRepository;
	
	public Appointment bookAppointment(Appointment appointment) {
		
		Patient patient = patientRepository.findById(
			    appointment.getPatient().getId()
			).orElseThrow();

			Doctor doctor = doctorRepository.findById(
			    appointment.getDoctor().getId()
			).orElseThrow();
	
		appointment.setPatient(patient);
		appointment.setDoctor(doctor);
	
        return appointmentRepository.save(appointment);
    }

	    
	public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

	  
	public Appointment getAppointmentById(Long id) {
        return appointmentRepository.findById(id).orElseThrow(() ->
                    new RuntimeException("Appointment not found"));
    }

	   
	public Appointment updateAppointment(Long id, Appointment appointment) {
        Appointment existing = getAppointmentById(id);

        existing.setAppointmentDate(appointment.getAppointmentDate());
        existing.setStatus(appointment.getStatus());
        existing.setPatient(appointment.getPatient());
        existing.setDoctor(appointment.getDoctor());
        existing.setTimeSlot(appointment.getTimeSlot());

        return appointmentRepository.save(existing);
    }

	    
	public void deleteAppointment(Long id) {
        appointmentRepository.deleteById(id);
    }

}
