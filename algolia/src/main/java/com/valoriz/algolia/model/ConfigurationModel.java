package com.valoriz.algolia.model;

public class ConfigurationModel {

    private String algoliaApplicationId;

    public String getAlgoliaApplicationId() {
        return algoliaApplicationId;
    }

    public void setAlgoliaApplicationId(String algoliaApplicationId) {
        this.algoliaApplicationId = algoliaApplicationId;
    }

    public String getAlgoliaIndexName() {
        return algoliaIndexName;
    }

    public void setAlgoliaIndexName(String algoliaIndexName) {
        this.algoliaIndexName = algoliaIndexName;
    }

    public String getAlgoliaAdminApiKey() {
        return algoliaAdminApiKey;
    }

    public void setAlgoliaAdminApiKey(String algoliaAdminApiKey) {
        this.algoliaAdminApiKey = algoliaAdminApiKey;
    }

    public SourceConfiguration getSourceConfiguration() {
        return sourceConfiguration;
    }

    public void setSourceConfiguration(SourceConfiguration sourceConfiguration) {
        this.sourceConfiguration = sourceConfiguration;
    }

    private String algoliaIndexName;

    private String algoliaAdminApiKey;

    private SourceConfiguration sourceConfiguration;

}
