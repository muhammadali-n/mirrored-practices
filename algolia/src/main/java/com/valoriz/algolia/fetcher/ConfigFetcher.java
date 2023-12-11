package com.valoriz.algolia.fetcher;

import org.codehaus.jackson.map.ObjectMapper;
import com.valoriz.algolia.model.ConfigFileModel;
import com.valoriz.algolia.model.ConfigurationModel;
import com.valoriz.algolia.model.TransformModel;

import java.io.File;
import java.io.IOException;

public class ConfigFetcher {

    /**
     * This method is used to fetch configuration file
     *
     * @return ConfigFileModel
     */
    public ConfigFileModel fetchConfigFile(String filePath, String tranformerJsonFilePath) {

        ConfigurationModel configurationModel = null;
        TransformModel transformerJson = null;
        try {
            configurationModel = jsonToConfigurationModel(filePath);
            transformerJson = jsonToTransformerModel(tranformerJsonFilePath);
        } catch (IOException e) {
            e.printStackTrace();
            // Handle the error appropriately
        }
        if (configurationModel == null) {
            // Handle missing configuration appropriately
            return null;
        }
        if (transformerJson == null) {
            // Handle missing configuration appropriately
            return null;
        }
        ConfigFileModel configFileModel = new ConfigFileModel();
        configFileModel.setConfigurationModel(configurationModel);
        configFileModel.setTransformModel(transformerJson);
        return configFileModel;
    }

    /**
     * This method is used to read json data from file path and convert to ConfigurationModel
     *
     * @param filePath
     * @return ConfigurationModel
     */
    public ConfigurationModel jsonToConfigurationModel(String filePath) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        File jsonFile = new File(filePath);
        // Use the ObjectMapper to read the JSON file and map it to the Document object.
        ConfigurationModel configurationModel = objectMapper.readValue(jsonFile, ConfigurationModel.class);
        return configurationModel;
    }

    /**
     * This method is used to read json data from file path and convert to TransformModel
     *
     * @param filePath
     * @return TransformModel
     */
    public TransformModel jsonToTransformerModel(String filePath) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        File jsonFile = new File(filePath);
        // Use the ObjectMapper to read the JSON file and map it to the Document object.
        TransformModel transformModel = objectMapper.readValue(jsonFile, TransformModel.class);
        return transformModel;
    }
}
