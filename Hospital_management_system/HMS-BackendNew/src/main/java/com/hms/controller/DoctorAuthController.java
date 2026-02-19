package com.hms.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hms.component.JwtUtil;
import com.hms.dto.AuthRequest;
import com.hms.dto.AuthResponse;
import com.hms.dto.DoctorRegisterRequest;
import com.hms.model.Doctor;
import com.hms.model.Role;
import com.hms.model.User;
import com.hms.repository.DoctorRepository;
import com.hms.repository.RoleRepository;
import com.hms.repository.UserRepository;
import com.hms.service.DoctorRegistrationService;

@RestController
@RequestMapping("/api/doctor-auth")
@CrossOrigin(origins = "http://localhost:3000")
public class DoctorAuthController {

	 @Autowired
	    private UserRepository userRepo;

	    @Autowired
	    private DoctorRepository doctorRepo;

	    @Autowired
	    private RoleRepository roleRepo;

	    @Autowired
	    private PasswordEncoder passwordEncoder;

	    @Autowired
	    private JwtUtil jwtUtil;

	    // 🔹 DOCTOR REGISTER
	    @PostMapping("/register")
	    public String registerDoctor(@RequestBody DoctorRegisterRequest req) {
	    	
	    	if (userRepo.findByUsername(req.getUsername()).isPresent()) {
	    	    throw new RuntimeException("Username already exists");
	    	}

	        Role doctorRole = roleRepo.findByName("DOCTOR");

	        User user = new User();
	        user.setUsername(req.getUsername());
	        user.setPassword(passwordEncoder.encode(req.getPassword()));
	        user.setRole(doctorRole);
	        user.setEnabled(true);
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

	        return "Doctor registered successfully";
	    }
	    
	    @PostMapping("/login")
	    public AuthResponse doctorLogin(@RequestBody AuthRequest request) {

	        User user = userRepo.findByUsername(request.username)
	            .orElseThrow(() -> new RuntimeException("Invalid username"));

	        if (!passwordEncoder.matches(request.password, user.getPassword())) {
	            throw new RuntimeException("Invalid password");
	        }

	        if (!user.getRole().getName().equals("DOCTOR")) {
	            throw new RuntimeException("Not a doctor account");
	        }

	        String token = jwtUtil.generateToken(
	            user.getUsername(),
	            "ROLE_DOCTOR"
	        );

	        return new AuthResponse(token);
	    }
}