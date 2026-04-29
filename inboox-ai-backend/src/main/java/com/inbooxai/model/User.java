package com.inbooxai.model;

import jakarta.persistence.*;
import java.util.HashMap;
import java.util.Map;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    
    @Column(unique = true)
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    
    // Profile Fields
    private String bio;
    private String role;
    private String company;
    private String avatarUrl;
    
    // AI Preferences
    private String defaultTone = "Professional";
    private String aiModel = "Gemini 1.5 Pro";
    private String responseLength = "Medium";
    
    // Settings & Security
    private boolean twoFactorEnabled = false;
    
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "user_notifications", joinColumns = @JoinColumn(name = "user_id"))
    @MapKeyColumn(name = "notification_type")
    @Column(name = "is_enabled")
    private Map<String, Boolean> notifications = new HashMap<>();

    // Billing & Subscription
    private String currentPlan = "Free Tier";
    private String subscriptionStatus = "Active";
    private int totalCredits = 100;
    private int usedCredits = 0;
    private String billingCycle = "Monthly";
    private String nextBillingDate = "May 25, 2026";
    
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "user_payment_methods", joinColumns = @JoinColumn(name = "user_id"))
    @MapKeyColumn(name = "field_name")
    @Column(name = "field_value")
    private Map<String, String> paymentMethod = new HashMap<>();

    public User() {
        notifications.put("weeklyUsage", true);
        notifications.put("writingTips", false);
        notifications.put("activity", true);
        notifications.put("announcements", true);
        
        paymentMethod.put("type", "VISA");
        paymentMethod.put("last4", "4242");
        paymentMethod.put("expiry", "12/28");
    }

    public User(String id, String email, String password, String firstName, String lastName) {
        this();
        this.id = id;
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }
    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }
    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    public String getCompany() { return company; }
    public void setCompany(String company) { this.company = company; }
    public String getAvatarUrl() { return avatarUrl; }
    public void setAvatarUrl(String avatarUrl) { this.avatarUrl = avatarUrl; }
    public String getDefaultTone() { return defaultTone; }
    public void setDefaultTone(String defaultTone) { this.defaultTone = defaultTone; }
    public String getAiModel() { return aiModel; }
    public void setAiModel(String aiModel) { this.aiModel = aiModel; }
    public String getResponseLength() { return responseLength; }
    public void setResponseLength(String responseLength) { this.responseLength = responseLength; }
    public boolean isTwoFactorEnabled() { return twoFactorEnabled; }
    public void setTwoFactorEnabled(boolean twoFactorEnabled) { this.twoFactorEnabled = twoFactorEnabled; }
    public Map<String, Boolean> getNotifications() { return notifications; }
    public void setNotifications(Map<String, Boolean> notifications) { this.notifications = notifications; }

    public String getCurrentPlan() { return currentPlan; }
    public void setCurrentPlan(String currentPlan) { this.currentPlan = currentPlan; }
    public String getSubscriptionStatus() { return subscriptionStatus; }
    public void setSubscriptionStatus(String subscriptionStatus) { this.subscriptionStatus = subscriptionStatus; }
    public int getTotalCredits() { return totalCredits; }
    public void setTotalCredits(int totalCredits) { this.totalCredits = totalCredits; }
    public int getUsedCredits() { return usedCredits; }
    public void setUsedCredits(int usedCredits) { this.usedCredits = usedCredits; }
    public String getBillingCycle() { return billingCycle; }
    public void setBillingCycle(String billingCycle) { this.billingCycle = billingCycle; }
    public String getNextBillingDate() { return nextBillingDate; }
    public void setNextBillingDate(String nextBillingDate) { this.nextBillingDate = nextBillingDate; }
    public Map<String, String> getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(Map<String, String> paymentMethod) { this.paymentMethod = paymentMethod; }

    public static UserBuilder builder() {
        return new UserBuilder();
    }

    public static class UserBuilder {
        private String id;
        private String email;
        private String password;
        private String firstName;
        private String lastName;

        public UserBuilder id(String id) { this.id = id; return this; }
        public UserBuilder email(String email) { this.email = email; return this; }
        public UserBuilder password(String password) { this.password = password; return this; }
        public UserBuilder firstName(String firstName) { this.firstName = firstName; return this; }
        public UserBuilder lastName(String lastName) { this.lastName = lastName; return this; }
        public User build() { return new User(id, email, password, firstName, lastName); }
    }
}
