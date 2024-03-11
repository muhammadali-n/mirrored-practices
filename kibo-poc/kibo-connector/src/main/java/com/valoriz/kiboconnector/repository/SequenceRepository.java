package com.valoriz.kiboconnector.repository;

import com.valoriz.kiboconnector.entity.Sequence;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SequenceRepository extends MongoRepository<Sequence, String> {

    Sequence findByName(String name);
}
