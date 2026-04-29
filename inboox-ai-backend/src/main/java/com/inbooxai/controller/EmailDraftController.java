package com.inbooxai.controller;

import com.inbooxai.dto.GenerationRequest;
import com.inbooxai.model.EmailDraft;
import com.inbooxai.service.EmailDraftService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/emails")
public class EmailDraftController {
    private final EmailDraftService service;

    public EmailDraftController(EmailDraftService service) {
        this.service = service;
    }

    @PostMapping("/generate")
    public ResponseEntity<String> generate(@RequestBody GenerationRequest request) {
        return ResponseEntity.ok(service.generateReply(request));
    }

    @GetMapping("/history")
    public ResponseEntity<List<EmailDraft>> getHistory() {
        return ResponseEntity.ok(service.getHistory());
    }
}
