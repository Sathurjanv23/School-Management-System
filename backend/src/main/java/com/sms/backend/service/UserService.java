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
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setRole(request.getRole());

        return userRepository.save(user);
    }

    public User loginUser(LoginRequest request) {
        Optional<User> user = userRepository.findByEmailAndPasswordAndRole(
                request.getEmail(),
                request.getPassword(),
                request.getRole()
        );

        return user.orElse(null);
    }
}