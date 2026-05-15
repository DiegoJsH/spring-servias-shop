package com.servias.shop.controller;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/util")
public class UtilController {

    private final PasswordEncoder passwordEncoder;

    public UtilController(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping("/encode-password")
    public String encodePassword(@RequestParam String password) {
        return passwordEncoder.encode(password);
    }
}
