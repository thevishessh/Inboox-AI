package com.inbooxai.controller;

import com.inbooxai.model.User;
import com.inbooxai.repository.UserRepository;
import com.inbooxai.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtService jwtService;

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(@RequestHeader("Authorization") String token) {
        String email = jwtService.extractUsername(token.substring(7));
        return userRepository.findFirstByEmail(email)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(@RequestHeader("Authorization") String token, @RequestBody User profileUpdate) {
        String email = jwtService.extractUsername(token.substring(7));
        return userRepository.findByEmail(email).map(user -> {
            user.setFirstName(profileUpdate.getFirstName());
            user.setLastName(profileUpdate.getLastName());
            user.setBio(profileUpdate.getBio());
            user.setRole(profileUpdate.getRole());
            user.setCompany(profileUpdate.getCompany());
            user.setAvatarUrl(profileUpdate.getAvatarUrl());
            userRepository.save(user);
            return ResponseEntity.ok(user);
        }).orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/settings")
    public ResponseEntity<?> updateSettings(@RequestHeader("Authorization") String token, @RequestBody User settingsUpdate) {
        String email = jwtService.extractUsername(token.substring(7));
        return userRepository.findByEmail(email).map(user -> {
            user.setDefaultTone(settingsUpdate.getDefaultTone());
            user.setAiModel(settingsUpdate.getAiModel());
            user.setResponseLength(settingsUpdate.getResponseLength());
            if (settingsUpdate.getSettings() != null) {
                user.setSettings(settingsUpdate.getSettings());
            }
            user.setTwoFactorEnabled(settingsUpdate.isTwoFactorEnabled());
            userRepository.save(user);

            return ResponseEntity.ok(user);
        }).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/billing/upgrade")
    public ResponseEntity<?> upgradePlan(@RequestHeader("Authorization") String token, @RequestBody Map<String, String> planRequest) {
        String email = jwtService.extractUsername(token.substring(7));
        return userRepository.findByEmail(email).map(user -> {
            String newPlan = planRequest.get("plan");
            user.setCurrentPlan(newPlan);
            if ("Pro Professional".equals(newPlan)) {
                user.setTotalCredits(1000);
            } else if ("Enterprise".equals(newPlan)) {
                user.setTotalCredits(5000);
            }
            user.setUsedCredits(0);
            userRepository.save(user);
            return ResponseEntity.ok(user);
        }).orElse(ResponseEntity.notFound().build());
    }
}
