package com.valoriz.algolia.model;

import java.util.List;
import java.util.Map;

public class SourceConfiguration {

    private String type;

    public Map<String, String> getFilePaths() {
        return filePaths;
    }

    public void setFilePaths(Map<String, String> filePaths) {
        this.filePaths = filePaths;
    }

    private Map<String, String> filePaths;

    private String clientId;

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Object getSource() {
        return source;
    }

    public void setSource(Object source) {
        this.source = source;
    }

    private Object source;

    public String getClientId() {
        return clientId;
    }

    public void setClientId(String clientId) {
        this.clientId = clientId;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public List<CollectionConfiguration> getCollectionConfiguration() {
        return collectionConfiguration;
    }

    public void setCollectionConfiguration(List<CollectionConfiguration> collectionConfiguration) {
        this.collectionConfiguration = collectionConfiguration;
    }

    private Boolean active;

    List<CollectionConfiguration> collectionConfiguration;

}
