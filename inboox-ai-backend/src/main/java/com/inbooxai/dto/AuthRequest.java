package com.inbooxai.dto;

public class AuthRequest {
    private String email;
    private String password;
    private String firstName;
    private String lastName;

    public AuthRequest() {}

    public AuthRequest(String email, String password, String firstName, String lastName) {
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public static AuthRequestBuilder builder() {
        return new AuthRequestBuilder();
    }

    public static class AuthRequestBuilder {
        private String email;
        private String password;
        private String firstName;
        private String lastName;

        public AuthRequestBuilder email(String email) { this.email = email; return this; }
        public AuthRequestBuilder password(String password) { this.password = password; return this; }
        public AuthRequestBuilder firstName(String firstName) { this.firstName = firstName; return this; }
        public AuthRequestBuilder lastName(String lastName) { this.lastName = lastName; return this; }
        public AuthRequest build() { return new AuthRequest(email, password, firstName, lastName); }
    }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }
    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }
}
