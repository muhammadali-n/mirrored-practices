package com.valoriz.kiboconnector.utils;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import org.bson.types.ObjectId;

import java.io.IOException;

public class ObjectIdSerializer extends JsonSerializer<ObjectId> {

    @Override
    public void serialize(final ObjectId objectId, final JsonGenerator jsonGenerator,
            final SerializerProvider serializers) throws IOException {
        jsonGenerator.writeString(objectId.toString());
    }
}