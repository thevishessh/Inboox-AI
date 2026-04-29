package com.inbooxai.repository;

import com.inbooxai.model.EmailDraft;
import com.inbooxai.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface EmailDraftRepository extends JpaRepository<EmailDraft, String> {
    List<EmailDraft> findByUser(User user);
}
