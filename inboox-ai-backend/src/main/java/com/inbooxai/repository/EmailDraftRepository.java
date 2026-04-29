package com.inbooxai.repository;

import com.inbooxai.model.EmailDraft;
import com.inbooxai.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface EmailDraftRepository extends MongoRepository<EmailDraft, String> {
    List<EmailDraft> findByUser(User user);
}
