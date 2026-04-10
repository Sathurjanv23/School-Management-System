package com.sms.backend.service;

import com.sms.backend.dto.LoginRequest;
import com.sms.backend.dto.RegisterRequest;
import com.sms.backend.model.User;
import com.sms.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User registerUser(RegisterRequest request) {
        User user = new User();
        user.setName(request.getName().trim());
        user.setEmail(request.getEmail().toLowerCase().trim());
        user.setPassword(request.getPassword().trim());
        user.setRole(request.getRole().toUpperCase().trim());

        return userRepository.save(user);
    }

    public User loginUser(LoginRequest request) {
        String email = request.getEmail().toLowerCase().trim();
        String password = request.getPassword().trim();

        Optional<User> optionalUser = userRepository.findByEmail(email);

        if (optionalUser.isEmpty()) {
            System.out.println("No user found for email: " + email);
            return null;
        }

        User user = optionalUser.get();

        System.out.println("DB EMAIL: " + user.getEmail());
        System.out.println("DB PASSWORD: " + user.getPassword());
        System.out.println("DB ROLE: " + user.getRole());

        System.out.println("REQ EMAIL: " + email);
        System.out.println("REQ PASSWORD: " + password);

        if (!user.getPassword().trim().equals(password)) {
            System.out.println("Password mismatch");
            return null;
        }

        return user;
    }
}