package com.hms.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.*;
import org.springframework.security.authentication.*;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.hms.component.*;
import com.hms.service.CustomUserDetailsService;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private JwtFilter jwtFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

    	http
    	  .csrf(csrf -> csrf.disable())
    	  .sessionManagement(session ->
    	      session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
    	  )
    	  .authorizeHttpRequests(auth -> auth
    	      .requestMatchers(org.springframework.http.HttpMethod.OPTIONS, "/**").permitAll()
    	      .requestMatchers("/api/auth/**").permitAll()
    	      .requestMatchers("/api/doctor-auth/**").permitAll()
    	      .requestMatchers("/api/admin/**").hasRole("ADMIN")
    	      .requestMatchers("/api/patients/**").authenticated()
    	      .requestMatchers("/api/payments/**").permitAll()
    	      .anyRequest().authenticated()
    	  );

    	http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}