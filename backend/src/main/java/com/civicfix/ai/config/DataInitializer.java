package com.civicfix.ai.config;

import com.civicfix.ai.model.Role;
import com.civicfix.ai.model.User;
import com.civicfix.ai.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {
    @Bean
    CommandLineRunner seedUsers(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            if (userRepository.existsByEmailIgnoreCase("admin@civicfix.ai")) {
                return;
            }
            User admin = new User();
            admin.setName("CivicFix Administrator");
            admin.setEmail("admin@civicfix.ai");
            admin.setPassword(passwordEncoder.encode("Admin@123"));
            admin.setRole(Role.ADMIN);
            userRepository.save(admin);
        };
    }
}
