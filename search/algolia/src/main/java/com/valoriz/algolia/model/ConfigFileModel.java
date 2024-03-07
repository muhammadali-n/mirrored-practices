package com.valoriz.algolia.model;

public class ConfigFileModel {

    public ConfigurationModel getConfigurationModel() {
        return configurationModel;
    }

    public void setConfigurationModel(ConfigurationModel configurationModel) {
        this.configurationModel = configurationModel;
    }

    public TransformModel getTransformModel() {
        return transformModel;
    }

    public void setTransformModel(TransformModel transformModel) {
        this.transformModel = transformModel;
    }

    private ConfigurationModel configurationModel;

    private TransformModel transformModel;

}
