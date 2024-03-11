package com.valoriz.algolia.model;

import java.util.List;
import java.util.Map;

public class QueryRequestBody {

    public String getCollectionName() {
        return collectionName;
    }

    public void setCollectionName(String collectionName) {
        this.collectionName = collectionName;
    }

    public Map<String, Object> getQueryConditions() {
        return queryConditions;
    }

    public void setQueryConditions(Map<String, Object> queryConditions) {
        this.queryConditions = queryConditions;
    }

    public List<String> getFields() {
        return fields;
    }

    public void setFields(List<String> fields) {
        this.fields = fields;
    }

    private String collectionName;

    private Map<String, Object> queryConditions;

    private List<String> fields;

}
