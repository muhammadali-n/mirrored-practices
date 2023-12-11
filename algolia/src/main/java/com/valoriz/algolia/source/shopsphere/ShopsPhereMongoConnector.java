package com.valoriz.algolia.source.shopsphere;

import com.valoriz.algolia.constants.Constants;
import org.bson.Document;
import com.valoriz.algolia.model.CollectionConfiguration;
import com.valoriz.algolia.model.QueryRequestBody;
import com.valoriz.algolia.model.SourceConfiguration;
import com.valoriz.algolia.source.MongoConnector;

import java.util.*;

public class ShopsPhereMongoConnector extends MongoConnector {

    public ShopsPhereMongoConnector(String connectionUrl, String databaseName) {
        super(connectionUrl, databaseName);
    }

    /**
     * This method is used to aggregate documents from different collections
     *
     * @param sourceConfiguration
     * @return List<Document>
     */
    public List<Document> shopsphereMongoDataAggregator(SourceConfiguration sourceConfiguration) {
        List<Document> products = new ArrayList<>();
        String clientId = sourceConfiguration.getClientId();
        Boolean active = sourceConfiguration.getActive();
        List<String> productCollectionFields = null;

        for (CollectionConfiguration configurationData : sourceConfiguration.getCollectionConfiguration()) {
            String collectionType = configurationData.getCollectionType();

            if (Constants.PRODUCT.equals(collectionType)) {
                productCollectionFields = configurationData.getFieldsToFetch();
                products.addAll(fetchProductCollection(clientId, active, configurationData.getCollectionName(),
                        productCollectionFields));
            } else {
                fetchData(products, clientId, active, configurationData, collectionType);
            }
        }

        removeFieldsIfNotPresent(products, productCollectionFields, Constants.PARENT_CATEGORIES,
                Constants.PRODUCT_BRAND);
        return products;
    }

    /**
     * This method is used to fetch category, price, brand
     *
     * @param products
     * @param clientId
     * @param active
     * @param configurationData
     */
    private void fetchData(List<Document> products, String clientId, Boolean active,
            CollectionConfiguration configurationData, String dataType) {
        Map<String, List<String>> typeConfig = getTypeConfig(configurationData, dataType);
        List<String> fieldsToFetch = typeConfig.get(Constants.FIELDS_TO_FETCH);
        List<String> objectIdToRemove = typeConfig.get(Constants.OBJECT_ID_TO_REMOVE);

        products.forEach(product -> {
            switch (dataType) {
            case Constants.CATEGORY:
                List<String> categoryIds = (List<String>) product.get(Constants.PARENT_CATEGORIES);
                List<Document> categories = fetchCategoryAndBrandCollection(clientId, active,
                        configurationData.getCollectionName(), categoryIds, fieldsToFetch);
                removeObjectId(categories);
                product.put(Constants.CATEGORIES, categories);
                break;

            case Constants.BRAND:
                String productId = (String) product.get(Constants.PRODUCT_BRAND);
                List<String> productBrandIds = Collections.singletonList(productId);
                List<Document> brands = fetchCategoryAndBrandCollection(clientId, active,
                        configurationData.getCollectionName(), productBrandIds, fieldsToFetch);
                removeObjectId(brands);
                product.put(Constants.BRAND, brands);
                break;

            case Constants.PRICE:
                String priceProductId = (String) product.get(Constants.OBJECT_ID);
                List<Document> fetchedPrice = fetchPriceCollection(configurationData.getPriceType(), active,
                        configurationData.getCollectionName(), priceProductId, fieldsToFetch);
                removeObjectId(fetchedPrice);
                product.put(Constants.PRICE, fetchedPrice);
                break;

            default:
                throw new IllegalArgumentException("Invalid data type: " + dataType);
            }
        });
    }

    private Map<String, List<String>> getTypeConfig(CollectionConfiguration configurationData, String dataType) {
        Map<String, List<String>> typeConfig = new HashMap<>();
        typeConfig.put(Constants.FIELDS_TO_FETCH, configurationData.getFieldsToFetch());
        typeConfig.put(Constants.OBJECT_ID_TO_REMOVE, Collections.singletonList(Constants.OBJECT_ID));

        if (Constants.PRICE.equals(dataType)) {
            typeConfig.get(Constants.FIELDS_TO_FETCH).add(Constants.PRICE_TYPE);
        }

        return typeConfig;
    }

    private void removeObjectId(List<Document> documents) {
        documents.forEach(document -> document.remove(Constants.OBJECT_ID));
    }

    /**
     * This method is used to fetch category
     *
     * @param products
     * @param fieldsToCheck
     * @param fieldsToRemove
     */
    private void removeFieldsIfNotPresent(List<Document> products, List<String> fieldsToCheck,
            String... fieldsToRemove) {
        List<String> fieldsToRemoveList = Arrays.asList(fieldsToRemove);
        fieldsToRemoveList.stream().filter(field -> !fieldsToCheck.contains(field))
                .forEach(fieldToRemove -> products.forEach(product -> product.remove(fieldToRemove)));
    }

    /**
     * This method is used to fetch documents in ProductCollection by certain criteria
     *
     * @param clientId
     * @param active
     * @param collectionName
     * @param fields
     * @return List<Document>
     */
    public List<Document> fetchProductCollection(String clientId, Boolean active, String collectionName,
            List<String> fields) {
        List<String> productAndCategoryMappingProperty = new ArrayList<>();
        if (!fields.contains(Constants.PARENT_CATEGORIES)) {
            productAndCategoryMappingProperty.add(Constants.PARENT_CATEGORIES);
        }
        if (!fields.contains(Constants.PRODUCT_BRAND)) {
            productAndCategoryMappingProperty.add(Constants.PRODUCT_BRAND);
        }
        QueryRequestBody queryRequestBody = new QueryRequestBody();
        List<String> newFields = new ArrayList<>(fields);
        Map<String, Object> queryConditions = new HashMap<>();
        //criteria
        queryConditions.put(Constants.CLIENT_ID, clientId);
        queryConditions.put(Constants.ACTIVE, active);
        queryRequestBody.setCollectionName(collectionName);
        queryRequestBody.setQueryConditions(queryConditions);
        queryRequestBody.setFields(newFields);
        newFields.addAll(productAndCategoryMappingProperty); // Always add, as it's already initialized
        List<Document> documents = fetchDocumentsByCriteria(queryRequestBody);
        return documents;
    }

    /**
     * This method is used to fetch documents in Category and Brand collection by certain criteria
     *
     * @param clientId
     * @param active
     * @param collectionName
     * @param ids
     * @param fields
     * @return List<Document>
     */
    public List<Document> fetchCategoryAndBrandCollection(String clientId, Boolean active, String collectionName,
            List<String> ids, List<String> fields) {
        List<String> newFields = new ArrayList<>();
        newFields.addAll(fields);
        List<Document> documents = new ArrayList<>();
        for (String id : ids) {
            QueryRequestBody queryRequestBody = new QueryRequestBody();
            Map<String, Object> queryConditions = new HashMap<>();
            //criteria
            queryConditions.put(Constants.OBJECT_ID, id);
            queryConditions.put(Constants.ACTIVE, active);
            queryConditions.put(Constants.CLIENT_ID, clientId);
            queryRequestBody.setCollectionName(collectionName);
            queryRequestBody.setQueryConditions(queryConditions);
            queryRequestBody.setFields(newFields);
            List<Document> documentsResult = fetchDocumentsByCriteria(queryRequestBody);
            documents.addAll(documentsResult);
        }
        return documents;
    }

    /**
     * This method is used to fetch documents in price collection by certain criteria
     *
     * @param priceType
     * @param active
     * @param collectionName
     * @param id
     * @param fields
     * @return List<Document>
     */
    public List<Document> fetchPriceCollection(String priceType, Boolean active, String collectionName, String id,
            List<String> fields) {
        List<Document> documents = new ArrayList<>();
        QueryRequestBody queryRequestBody = new QueryRequestBody();
        Map<String, Object> queryConditions = new HashMap<>();
        //criteria
        queryConditions.put(Constants.ENABLED, active);
        if (priceType != null) {
            queryConditions.put(Constants.PRICE_TYPE, priceType);
        }
        queryConditions.put(Constants.PRODUCT_ID, id);
        queryRequestBody.setCollectionName(collectionName);
        queryRequestBody.setQueryConditions(queryConditions);
        queryRequestBody.setFields(fields);
        List<Document> documentsResult = fetchDocumentsByCriteria(queryRequestBody);
        documents.addAll(documentsResult);
        return documents;
    }

}
