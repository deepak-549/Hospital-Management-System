package com.hms.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.*;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import com.hms.component.JwtUtil;
import com.hms.dto.AuthRequest;
import com.hms.dto.AuthResponse;
import com.hms.service.CustomUserDetailsService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public AuthResponse login(@RequestBody AuthRequest request) {

        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.username, request.password
            )
        );

        UserDetails user =
            userDetailsService.loadUserByUsername(request.username);

        String role =
            user.getAuthorities().iterator().next().getAuthority();

        String token =
            jwtUtil.generateToken(user.getUsername(), role);

        return new AuthResponse(token);
    }
}
