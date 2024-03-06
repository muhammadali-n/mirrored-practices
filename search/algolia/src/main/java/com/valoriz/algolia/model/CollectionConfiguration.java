package com.valoriz.algolia.model;

import java.util.List;

public class CollectionConfiguration {

    private String type;

    private String collectionName;

    public String getCollectionType() {
        return collectionType;
    }

    public void setCollectionType(String collectionType) {
        this.collectionType = collectionType;
    }

    private String collectionType;

    public String getType() {

        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getCollectionName() {
        return collectionName;
    }

    public void setCollectionName(String collectionName) {
        this.collectionName = collectionName;
    }

    public List<String> getFieldsToFetch() {
        return fieldsToFetch;
    }

    public void setFieldsToFetch(List<String> fieldsToFetch) {
        this.fieldsToFetch = fieldsToFetch;
    }

    public List<String> getMappingProperties() {
        return mappingProperties;
    }

    public void setMappingProperties(List<String> mappingProperties) {
        this.mappingProperties = mappingProperties;
    }

    public String getPriceType() {
        return priceType;
    }

    public void setPriceType(String priceType) {
        this.priceType = priceType;
    }

    private List<String> fieldsToFetch;

    private List<String> mappingProperties;

    private String priceType;

}
