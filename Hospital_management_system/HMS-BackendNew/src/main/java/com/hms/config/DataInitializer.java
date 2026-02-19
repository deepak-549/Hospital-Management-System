package com.hms.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.hms.model.Role;
import com.hms.model.User;
import com.hms.repository.RoleRepository;
import com.hms.repository.UserRepository;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initData(
            RoleRepository roleRepo,
            UserRepository userRepo,
            PasswordEncoder passwordEncoder) {

        return args -> {

            // 🔹 Create ADMIN role if not exists
            Role adminRole = roleRepo.findByName("ADMIN");
            if (adminRole == null) {
                adminRole = new Role();
                adminRole.setName("ADMIN");
                roleRepo.save(adminRole);
            }

            // 🔹 Create admin user if not exists
            if (userRepo.findByUsername("admin").isEmpty()) {

                User admin = new User();
                admin.setUsername("admin");
                admin.setPassword(passwordEncoder.encode("admin123"));
                admin.setEnabled(true);
                admin.setRole(adminRole);

                userRepo.save(admin);

                System.out.println("✅ Default ADMIN user created");
            }
            
            Role doctorRole = roleRepo.findByName("DOCTOR");
            if (doctorRole == null) {
                doctorRole = new Role();
                doctorRole.setName("DOCTOR");
                roleRepo.save(doctorRole);
            }
        };
    }
}