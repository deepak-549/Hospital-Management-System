package com.hms.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.autoconfigure.WebMvcProperties.Apiversion.Use;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.hms.dto.DoctorRegisterRequest;
import com.hms.model.Doctor;
import com.hms.model.Role;
import com.hms.model.User;
import com.hms.repository.DoctorRepository;
import com.hms.repository.RoleRepository;
import com.hms.repository.UserRepository;

@Service
public class DoctorRegistrationService {

    @Autowired
    private DoctorRepository doctorRepo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private RoleRepository roleRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public void registerDoctor(DoctorRegisterRequest req) {

        Role doctorRole = roleRepo.findByName("DOCTOR");
        User user = new User();
        user.setUsername(req.getUsername());
        user.setPassword(passwordEncoder.encode(req.getPassword()));
        user.setRole(doctorRole);
        user.setEnabled(false); // ❗ admin approval required

        userRepo.save(user);

        Doctor doctor = new Doctor();
        doctor.setName(req.getName());
        doctor.setEmail(req.getEmail());
        doctor.setGender(req.getGender());
        doctor.setExperience(req.getExperience());
        doctor.setSpecialization(req.getSpecialization());
        doctor.setPhone(req.getPhone());
        doctor.setUser(user);

        doctorRepo.save(doctor);
    }
}
