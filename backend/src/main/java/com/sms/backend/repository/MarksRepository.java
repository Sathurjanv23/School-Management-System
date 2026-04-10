package com.sms.backend.repository;

import com.sms.backend.model.Marks;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MarksRepository extends MongoRepository<Marks, String> {
}