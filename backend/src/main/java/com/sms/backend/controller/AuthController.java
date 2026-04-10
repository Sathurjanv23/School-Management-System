package com.sms.backend.controller;

import com.sms.backend.config.JwtUtil;
import com.sms.backend.dto.LoginRequest;
import com.sms.backend.dto.RegisterRequest;
import com.sms.backend.model.User;
import com.sms.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public User register(@RequestBody RegisterRequest request) {
        return userService.registerUser(request);
    }

    @PostMapping("/login")
    public Object login(@RequestBody LoginRequest request) {
        User user = userService.loginUser(request);

        if (user == null) {
            return "Invalid email, password, or role";
        }

        String token = jwtUtil.generateToken(user.getEmail());

        Map<String, Object> response = new HashMap<>();
        response.put("user", user);
        response.put("token", token);

        return response;
    }
}