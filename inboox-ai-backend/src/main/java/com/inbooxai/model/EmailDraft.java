package com.inbooxai.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Document(collection = "email_drafts")
public class EmailDraft {
    @Id
    private String id;
    
    private String recipient;
    
    private String subject;
    
    private String content;
    
    private String tone;
    
    private LocalDateTime createdAt;
    
    @DBRef
    private User user;

    public EmailDraft() {}

    public EmailDraft(String id, String recipient, String subject, String content, String tone, LocalDateTime createdAt, User user) {
        this.id = id;
        this.recipient = recipient;
        this.subject = subject;
        this.content = content;
        this.tone = tone;
        this.createdAt = createdAt;
        this.user = user;
    }

    public static EmailDraftBuilder builder() {
        return new EmailDraftBuilder();
    }

    public static class EmailDraftBuilder {
        private String id;
        private String recipient;
        private String subject;
        private String content;
        private String tone;
        private LocalDateTime createdAt;
        private User user;

        public EmailDraftBuilder id(String id) { this.id = id; return this; }
        public EmailDraftBuilder recipient(String recipient) { this.recipient = recipient; return this; }
        public EmailDraftBuilder subject(String subject) { this.subject = subject; return this; }
        public EmailDraftBuilder content(String content) { this.content = content; return this; }
        public EmailDraftBuilder tone(String tone) { this.tone = tone; return this; }
        public EmailDraftBuilder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }
        public EmailDraftBuilder user(User user) { this.user = user; return this; }
        public EmailDraft build() { return new EmailDraft(id, recipient, subject, content, tone, createdAt, user); }
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getRecipient() { return recipient; }
    public void setRecipient(String recipient) { this.recipient = recipient; }
    public String getSubject() { return subject; }
    public void setSubject(String subject) { this.subject = subject; }
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
    public String getTone() { return tone; }
    public void setTone(String tone) { this.tone = tone; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
}
