package com.sms.backend.service;

import com.sms.backend.dto.ForgotPasswordRequest;
import com.sms.backend.dto.LoginRequest;
import com.sms.backend.dto.LoginResponse;
import com.sms.backend.dto.ResetPasswordRequest; // ✅ ADD THIS
import com.sms.backend.dto.SignupRequest;
import com.sms.backend.dto.SignupResponse;

public interface AuthService {

    LoginResponse login(LoginRequest request);

    SignupResponse signup(SignupRequest request);

    String forgotPassword(ForgotPasswordRequest request);

    String resetPassword(ResetPasswordRequest request); // ✅ ADD THIS
}