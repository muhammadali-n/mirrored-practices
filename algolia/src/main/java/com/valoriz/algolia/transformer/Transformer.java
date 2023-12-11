package com.valoriz.algolia.transformer;

import org.bson.Document;
import com.valoriz.algolia.model.TransformModel;

import java.util.List;

public interface Transformer {

    /**
     * This method is used to transform value to user specified type
     *
     * @param aggregatedObjects
     * @param transformModel
     * @return List<Document>
     */
    public List<Document> valueTransformer(List<Document> aggregatedObjects, TransformModel transformModel);

    /**
     * This method is used to transform attribute name to user specified name
     *
     * @param documents
     * @param transformModel
     * @return List<Document>
     */
    public List<Document> attributeTransformer(List<Document> documents, TransformModel transformModel);

}
