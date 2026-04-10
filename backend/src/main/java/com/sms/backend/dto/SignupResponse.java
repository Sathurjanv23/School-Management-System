package com.sms.backend.dto;

import com.sms.backend.model.User;

public class SignupResponse {

    private String message;
    private User user;

    public SignupResponse() {
    }

    public SignupResponse(String message, User user) {
        this.message = message;
        this.user = user;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}