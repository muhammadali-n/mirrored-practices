package com.valoriz.algolia.transformer;

import com.valoriz.algolia.model.TransformModel;
import org.bson.Document;
import org.json.JSONArray;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class TransformerImpl implements Transformer {

    /**
     * This method is used to transform value to user specified type
     *
     * @param aggregatedObjects
     * @param transformModel
     * @return List<Document>
     */
    public List<Document> valueTransformer(List<Document> aggregatedObjects, TransformModel transformModel) {
        List<Document> originalValue = aggregatedObjects;
        Map<String, String> transformationType = new HashMap<>();
        transformModel.getTransformer().stream()
                .forEach(obj -> transformationType.put(obj.getInputFieldName(), obj.getConvertTo()));
        List<Document> transformedValue = new ArrayList<>();

        for (Document document : originalValue) {
            if (document instanceof Map) {
                Map<?, ?> mapValue = document;
                Document transformedDocument = new Document(); // Assuming Document is a class or you may need to use another class

                for (Map.Entry<?, ?> entry : mapValue.entrySet()) {
                    String fieldName = (String) entry.getKey();
                    Object fieldValue = entry.getValue();

                    if (transformationType.containsKey(fieldName) && fieldValue != null && transformationType.get(
                            fieldName) != null) {
                        String type = transformationType.get(fieldName);
                        Object transformedFieldValue = applyTransformation(type, fieldValue);
                        transformedDocument.put(fieldName, transformedFieldValue);
                    } else {
                        transformedDocument.put(fieldName, fieldValue);
                    }
                }
                transformedValue.add(transformedDocument);
            }
        }
        return transformedValue;
    }

    /**
     * This method transforms value to one type to another type
     *
     * @param transformationType
     * @param fieldValue
     * @return Object
     */
    private Object applyTransformation(String transformationType, Object fieldValue) {
        switch (transformationType) {
        case "booleanToString":
            return booleanToString(fieldValue);
        case "stringToInteger":
            return stringToInteger(fieldValue);
        case "integerToBoolean":
            return integerToBoolean(fieldValue);
        case "integerToString":
            return integerToString(fieldValue);
        case "jsonArrayToList":
            return jsonArrayToList(fieldValue);
        // Add more cases for other transformation types as needed
        default:
            return fieldValue;
        }
    }

    private Object booleanToString(Object fieldValue) {
        return (fieldValue instanceof Boolean) ? fieldValue.toString() : fieldValue;
    }

    private Object stringToInteger(Object fieldValue) {
        if (fieldValue instanceof String string) {
            try {
                return Integer.parseInt(string);
            } catch (NumberFormatException e) {
                return null;
            }
        }
        return fieldValue;
    }

    private Object integerToBoolean(Object fieldValue) {
        return (fieldValue instanceof Integer) ? (int) fieldValue != 0 : fieldValue;
    }

    private Object integerToString(Object fieldValue) {
        return (fieldValue instanceof Integer) ? fieldValue.toString() : fieldValue;
    }

    private Object jsonArrayToList(Object fieldValue) {
        if (fieldValue instanceof JSONArray jsonArray) {
            List<String> resultList = new ArrayList<>();

            for (int i = 0; i < jsonArray.length(); i++) {
                String element = jsonArray.getString(i);
                resultList.add(element);
            }

            return resultList;
        }
        return fieldValue;
    }

    /**
     * This method is used to transform attribute name to user specified name
     *
     * @param documents
     * @param transformModel
     * @return List<Document>
     */
    public List<Document> attributeTransformer(List<Document> documents, TransformModel transformModel) {
        Map<String, String> fieldMappings = new HashMap<>();
        transformModel.getTransformer().stream()
                .forEach(obj -> fieldMappings.put(obj.getInputFieldName(), obj.getOutputFieldName()));
        List<Document> updatedIndexObjects = new ArrayList<>();
        for (Document document : documents) {
            Document updatedDocument = new Document(document);
            for (Map.Entry<String, String> entry : fieldMappings.entrySet()) {
                String oldFieldName = entry.getKey();
                String newFieldName = entry.getValue();
                if (updatedDocument.containsKey(oldFieldName) && newFieldName != null) {
                    updatedDocument.put(newFieldName, updatedDocument.get(oldFieldName));
                    updatedDocument.remove(oldFieldName);
                }
            }
            updatedIndexObjects.add(updatedDocument);
        }
        return updatedIndexObjects;
    }

}
