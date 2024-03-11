package com.valoriz.algolia.source;

import com.mongodb.client.*;
import com.valoriz.algolia.constants.Constants;
import org.bson.Document;
import org.bson.types.ObjectId;
import com.valoriz.algolia.model.QueryRequestBody;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class MongoConnector implements NoSqlConnector {

    private String connectionUrl;

    private String databaseName;

    public MongoConnector(String connectionUrl, String databaseName) {
        this.connectionUrl = connectionUrl;
        this.databaseName = databaseName;
    }

    /**
     * This method is used to fetch documents by criteria
     *
     * @param queryRequestBody
     * @return List<Document>
     */
    public List<Document> fetchDocumentsByCriteria(QueryRequestBody queryRequestBody) {
        List<Document> documents = new ArrayList<>();

        try (MongoClient mongoClient = MongoClients.create(connectionUrl)) {
            MongoDatabase database = mongoClient.getDatabase(databaseName);
            MongoCollection<Document> collection = database.getCollection(queryRequestBody.getCollectionName());

            Map<String, Object> queryConditions = queryRequestBody.getQueryConditions();
            Document query;

            if (queryConditions.containsKey(Constants.OBJECT_ID)) {
                String idString = queryConditions.get(Constants.OBJECT_ID).toString();
                ObjectId objectId = new ObjectId(idString);
                query = new Document(Constants.OBJECT_ID, objectId);
            } else {
                query = new Document(queryConditions);
            }

            // Check if fields are specified in the request
            if (queryRequestBody.getFields() != null && !queryRequestBody.getFields().isEmpty()) {
                Document projection = new Document();
                for (String field : queryRequestBody.getFields()) {
                    projection.append(field, 1);
                }

                FindIterable<Document> result = collection.find(query).projection(projection);

                for (Document document : result) {
                    normalizeDocumentId(document);
                    documents.add(document);
                }
            } else {
                // If no fields are specified, fetch all fields
                FindIterable<Document> result = collection.find(query);

                for (Document document : result) {
                    normalizeDocumentId(document);
                    documents.add(document);
                }
            }
        } catch (Exception e) {
            e.printStackTrace(); // Handle exceptions properly
        }

        return documents;
    }

    /**
     * This method is used to convert object type '_id' to String '_id'
     *
     * @param document
     */
    private void normalizeDocumentId(Document document) {
        Object idField = document.get(Constants.OBJECT_ID);
        if (idField instanceof ObjectId objectid) {
            document.put(Constants.OBJECT_ID, objectid.toString());
        }
    }

}
