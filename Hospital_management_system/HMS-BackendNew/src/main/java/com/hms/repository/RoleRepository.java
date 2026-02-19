package com.hms.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hms.model.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Role findByName(String name);
}