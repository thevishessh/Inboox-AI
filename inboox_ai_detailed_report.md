# PROJECT REPORT ON
# INBOOX AI: AN INTELLIGENT EMAIL REPLY GENERATOR SaaS

**Submitted by:** [Your Name]  
**Roll No:** [Your Roll Number]  
**Department:** Computer Science & Engineering  
**Institution:** [Your Institution Name]

---

## TABLE OF CONTENTS
1.  **Abstract**
2.  **Acknowledgement**
3.  **Introduction**
    - 1.1 Overview
    - 1.2 Motivation
    - 1.3 Problem Statement
4.  **System Analysis**
    - 2.1 Feasibility Study
    - 2.2 Software Requirements
    - 2.3 Hardware Requirements
5.  **System Design**
    - 3.1 System Architecture (Block Diagram)
    - 3.2 Data Flow Diagram (DFD)
    - 3.3 E-R Diagram (Database Structure)
    - 3.4 API Documentation
6.  **Implementation**
    - 4.1 Frontend Development (Next.js)
    - 4.2 Backend Development (Spring Boot)
    - 4.3 Database Integration (MongoDB Atlas)
    - 4.4 AI Model Integration (Groq Llama 3.3)
7.  **Testing & Validation**
    - 5.1 Unit Testing
    - 5.2 Integration Testing
    - 5.3 Debugging (TLS & JSON Fixes)
8.  **Results & Discussion**
    - 6.1 Screenshots & Descriptions
    - 6.2 Performance Analysis
9.  **Conclusion & Future Scope**
10. **Bibliography / References**

---

## CHAPTER 1: ABSTRACT
Inboox AI is a comprehensive SaaS solution designed to automate email communication using cutting-edge Artificial Intelligence. By leveraging the power of Large Language Models (LLMs), the system generates context-aware, personalized email drafts. Built using a robust tech stack including Next.js, Spring Boot, and MongoDB Atlas, it ensures high performance, security via JWT, and scalability. This report details the full lifecycle of the project from requirement analysis to cloud-native implementation.

---

## CHAPTER 2: INTRODUCTION
### 1.1 Overview
Inboox AI serves as a bridge between high-volume incoming correspondence and professional response synthesis. Unlike generic templates, it analyzes the "Tone" and "Context" of the email to provide a unique draft.

### 1.2 Problem Statement
Professionals spend over 3 hours daily just replying to emails. Manual drafting is slow and prone to errors. Current solutions are either too expensive or lack the security features required for professional data handling.

---

## CHAPTER 3: SYSTEM ANALYSIS
### 2.1 Feasibility Study
- **Technical Feasibility**: Using Groq LPUs for inference makes the project extremely fast.
- **Economic Feasibility**: Built on open-source frameworks (Next.js/Spring Boot) keeping the cost minimal.

### 2.2 Software Requirements
- **Frontend**: Next.js 14, React, Tailwind CSS, Framer Motion.
- **Backend**: Spring Boot 3.2.5, Spring Security, JWT.
- **Database**: MongoDB Atlas (Cloud NoSQL).
- **Inference**: Groq API (Llama 3.3 Model).

---

## CHAPTER 4: SYSTEM DESIGN
### 3.1 System Architecture
*(Insert Block Diagram showing Frontend <-> Backend <-> MongoDB Atlas & Groq API)*

### 3.2 Database Schema (MongoDB Collections)
**User Collection:**
```json
{
  "_id": "ObjectId",
  "firstName": "String",
  "lastName": "String",
  "email": "String (Unique Index)",
  "password": "Encrypted String",
  "settings": {
    "activity": "Boolean",
    "weeklyUsage": "Boolean"
  }
}
```

---

## CHAPTER 5: IMPLEMENTATION
### 4.1 Security Implementation (JWT)
The system uses stateless JWT tokens. When a user logs in, the `AuthService` generates a token that is stored in the browser's cookies. All subsequent requests to `/api/emails/**` are guarded by the `JwtAuthenticationFilter`.

### 4.2 AI Logic (EmailDraftService)
The prompt engineering logic ensures that the LLM understands the difference between a "Friendly" and "Professional" tone. We use a structured prompt:
*"Generate a [Tone] email reply for the following content: [Input] Response:"*

---

## CHAPTER 6: TESTING & DEBUGGING
### 5.1 Real-world Debugging Case Study
During development, a critical **TLS Handshake Alert** occurred when connecting to the MongoDB Atlas cluster.
- **Problem**: Java 25 security defaults were too strict for the cloud certificates.
- **Solution**: Implemented aggressive timeouts (2s) and optimized the connection string in `application-secrets.properties`.

---

## CHAPTER 7: RESULTS (SCREENSHOTS GUIDE)
*To fill up your 50 pages, add full-page screenshots for these:*
1.  **Landing Page**: Show the hero section and "Get Started" button.
2.  **Signup/Login**: Show the form with validation errors.
3.  **Dashboard**: Show the "Generate" interface.
4.  **History Page**: Show the list of past generated drafts.
5.  **Settings**: Show the profile update and notification toggles.

---

## CHAPTER 8: FUTURE SCOPE
1.  **Email Provider Integration**: Connecting directly to Gmail/Outlook APIs.
2.  **Mobile App**: Building a React Native version for mobile users.
3.  **Voice Interaction**: Generating drafts using voice commands.

---

## BIBLIOGRAPHY
- Spring Framework Documentation
- Next.js 14 Official Guide
- MongoDB University Certification Materials
- Groq Cloud Documentation
