package com.valoriz.kiboconnector.entity;

import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Map;

@Data
@Document(collection = "kibo_sequence")
public class Sequence extends BaseEntity<ObjectId>{

    private String name;

    private SequenceConfiguration defaultConfiguration;
}
