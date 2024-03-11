package com.valoriz.algolia;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.valoriz.algolia.constants.Constants;
import com.valoriz.algolia.destination.IndexService;
import com.valoriz.algolia.fetcher.ConfigFetcher;
import com.valoriz.algolia.model.ConfigFileModel;
import com.valoriz.algolia.source.JsonConnector;
import com.valoriz.algolia.source.MongoConnector;
import com.valoriz.algolia.source.XmlConnector;
import com.valoriz.algolia.token.OcctooAccessTokenGenerator;
import com.valoriz.algolia.source.json.JsonReader;
import com.valoriz.algolia.source.shopsphere.ShopsPhereMongoConnector;
import com.valoriz.algolia.transformer.Transformer;
import org.apache.http.impl.client.CloseableHttpClient;
import org.bson.Document;
import com.valoriz.algolia.transformer.TransformerImpl;
import org.yaml.snakeyaml.Yaml;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;

import java.io.IOException;
import java.io.InputStream;
import java.util.*;

import java.util.logging.Logger;

public class ConnectorMain {

    private static final Logger logger = Logger.getLogger(ConnectorMain.class.getName());

    public static void main(String[] args) throws IOException {

        Yaml yaml = new Yaml();

        // Load the YAML file
        try (InputStream inputStream = ConnectorMain.class.getClassLoader()
                .getResourceAsStream(Constants.APPLICATION_YML)) {
            if (inputStream == null) {
                throw new IOException("Failed to load the YAML file");
            }
            Map<String, Object> yamlData = yaml.load(inputStream);

            // fetching mongodb credentials
            Map<String, Object> mongoFilePaths = (Map<String, Object>) yamlData.get(Constants.MONGO_DB);
            String connectionUrl = (String) mongoFilePaths.get(Constants.CONNECTION_URL);
            String databaseName = (String) mongoFilePaths.get(Constants.DATABASE_NAME);

            // DB Connector
            new MongoConnector(connectionUrl, databaseName);

            // fetching configuration and transformer json files for database connector
            Map<String, Object> filePaths = (Map<String, Object>) yamlData.get(Constants.CONFIGURATION_FILE_PATHS);
            String dbConfigFilePath = (String) filePaths.get(Constants.DB_CONFIGURATION);
            String jsonConfigFilePath = (String) filePaths.get(Constants.JSON_CONFIGURATION);
            String xmlConfigFilePath = (String) filePaths.get(Constants.XML_CONFIGURATION);
            String apiConfigFilePath = (String) filePaths.get(Constants.API_CONFIGURATION);
            String transformerJsonFilePath = (String) filePaths.get(Constants.TRANSFORMER);

            //config fetcher
            ConfigFetcher configFetcher = new ConfigFetcher();

            ConfigFileModel dbConfigFiles = configFetcher.fetchConfigFile(dbConfigFilePath, transformerJsonFilePath);
            ConfigFileModel jsonConfigFiles = configFetcher.fetchConfigFile(jsonConfigFilePath,
                    transformerJsonFilePath);
            ConfigFileModel xmlConfigFiles = configFetcher.fetchConfigFile(xmlConfigFilePath, transformerJsonFilePath);
            ConfigFileModel apiConfigFiles = configFetcher.fetchConfigFile(apiConfigFilePath, transformerJsonFilePath);

            // API Connector
            String apiConnectorType = apiConfigFiles.getConfigurationModel().getSourceConfiguration().getType();
            if (Constants.API_CONNECTOR.equals(apiConnectorType)) {
                handleConnector(Constants.API_CONNECTOR, apiConfigFiles, null, null);
            }

            // XML Connector
            String xmlConnectorType = xmlConfigFiles.getConfigurationModel().getSourceConfiguration().getType();
            if (Constants.XML_CONNECTOR.equals(xmlConnectorType)) {
                handleConnector(Constants.XML_CONNECTOR, xmlConfigFiles, null, null);
            }

            // JSON Connector
            String jsonConnectorType = jsonConfigFiles.getConfigurationModel().getSourceConfiguration().getType();
            if (Constants.JSON_CONNECTOR.equals(jsonConnectorType)) {
                handleConnector(Constants.JSON_CONNECTOR, jsonConfigFiles, null, null);
            }

            // DB (Mongo DB)
            String mongoConnectorType = dbConfigFiles.getConfigurationModel().getSourceConfiguration().getType();
            if (Constants.MONGO_CONNECTOR.equals(mongoConnectorType)) {
                handleConnector(Constants.MONGO_CONNECTOR, dbConfigFiles, connectionUrl, databaseName);
            }
        }

    }

    private static void handleConnector(String connectorType, ConfigFileModel configFileModel, String connectionUrl,
            String databaseName) throws IOException {
        switch (connectorType) {
        case Constants.API_CONNECTOR:
            handleApiConnector(configFileModel);
            break;
        case Constants.XML_CONNECTOR:
            handleXmlConnector(configFileModel);
            break;
        case Constants.JSON_CONNECTOR:
            handleJsonConnector(configFileModel);
            break;
        case Constants.MONGO_CONNECTOR:
            handleShopsphereMongoConnector(configFileModel, connectionUrl, databaseName);
            break;
        default:
            // Handle unknown connector type if needed
            logger.warning("Unknown connector type: " + connectorType);
        }
    }

    private static void handleShopsphereMongoConnector(ConfigFileModel dbConfigFiles, String connectionUrl,
            String databaseName) {
        List<Document> aggregatedObjects;

        // raw data aggregation
        ShopsPhereMongoConnector shopsPhereMongoConnector = new ShopsPhereMongoConnector(connectionUrl, databaseName);

        aggregatedObjects = shopsPhereMongoConnector.shopsphereMongoDataAggregator(
                dbConfigFiles.getConfigurationModel().getSourceConfiguration());

        if (aggregatedObjects != null) {
            //value transformer
            Transformer transformer = new TransformerImpl();
            List<Document> transformedValues = transformer.valueTransformer(aggregatedObjects,
                    dbConfigFiles.getTransformModel());

            //attribute transformer
            List<Document> transformedAttribute = transformer.attributeTransformer(transformedValues,
                    dbConfigFiles.getTransformModel());

            //calling algolia for indexing
            IndexService indexService = new IndexService();
            String algoliaApplicationId = dbConfigFiles.getConfigurationModel().getAlgoliaApplicationId();
            String algoliaIndexName = dbConfigFiles.getConfigurationModel().getAlgoliaIndexName();
            String algoliaAdminApiKey = dbConfigFiles.getConfigurationModel().getAlgoliaAdminApiKey();

            //bulk index
            List<Document> indexedDocuments = indexService.bulkIndex(algoliaApplicationId, algoliaIndexName,
                    algoliaAdminApiKey, transformedAttribute);
            logger.info("DB indexed documents : " + indexedDocuments);
        }
    }

    private static void handleJsonConnector(ConfigFileModel jsonConfigFiles) {
        // fetching product, inventory and price paths from json config file
        List<String> jsonFileKeys = List.of(Constants.INVENTORY_JSON_FILE, Constants.PRICE_JSON_FILE,
                Constants.PRODUCT_JSON_FILE);

        String inventoryJson = null;
        String priceJson = null;
        String productJson = null;

        for (String fileKey : jsonFileKeys) {
            String jsonFilePath = jsonConfigFiles.getConfigurationModel().getSourceConfiguration().getFilePaths()
                    .get(fileKey);
            switch (fileKey) {
            case Constants.INVENTORY_JSON_FILE:
                inventoryJson = jsonFilePath;
                break;
            case Constants.PRICE_JSON_FILE:
                priceJson = jsonFilePath;
                break;
            case Constants.PRODUCT_JSON_FILE:
                productJson = jsonFilePath;
                break;
            // Add more cases if needed
            default:
                // Handle the case where fileKey doesn't match any known case
                logger.warning("Unknown file key: " + fileKey);
                break;
            }

        }

        // Read JSON data from the file
        String productJsonData = JsonConnector.readJsonFile(productJson);
        String inventryJsonData = JsonConnector.readJsonFile(inventoryJson);
        String priceJsonData = JsonConnector.readJsonFile(priceJson);

        // Assuming you have a map to store JSON data for each collection
        Map<String, String> jsonDataMap = new HashMap<>();
        jsonDataMap.put(Constants.PRODUCT, productJsonData);
        jsonDataMap.put(Constants.INVENTORY, inventryJsonData);
        jsonDataMap.put(Constants.PRICE, priceJsonData);

        List<Document> products = new ArrayList<>();
        List<Document> inventory = new ArrayList<>();
        List<Document> price = new ArrayList<>();

        jsonConfigFiles.getConfigurationModel().getSourceConfiguration().getCollectionConfiguration()
                .forEach(config -> {
                    String collectionName = config.getCollectionName();
                    String jsonData = jsonDataMap.get(collectionName);

                    if (jsonData != null) {
                        List<Document> data = JsonReader.fetchDocuments(jsonData, config.getCollectionType(),
                                config.getFieldsToFetch());
                        switch (collectionName) {
                        case Constants.PRODUCT:
                            products.addAll(data);
                            break;
                        case Constants.INVENTORY:
                            inventory.addAll(data);
                            break;
                        case Constants.PRICE:
                            price.addAll(data);
                            break;
                        default:
                            // Handle the case where collectionName doesn't match any known case
                            logger.warning("Unknown collection name: " + collectionName);
                            break;
                        }
                    } else {
                        // Handle the case where JSON data is not available for the collection
                        logger.warning("JSON data not found for collection: " + collectionName);
                    }
                });

        List<Document> aggregatedProducts = new ArrayList<>();

        for (Document pro : products) {
            // Create a new product document for each iteration
            Document product = new Document();
            Document inventoryObj = new Document();
            Document priceObj = new Document();
            product.putAll(pro);
            String productId = pro.get(Constants.ID).toString();
            priceObj.putAll(JsonReader.fetchDataById(price, productId));
            inventoryObj.putAll(JsonReader.fetchDataById(inventory, productId));
            product.put(Constants.INVENTORY, inventoryObj);
            product.put(Constants.PRICE, priceObj);
            aggregatedProducts.add(product);
        }

        //value transformer
        Transformer transformer = new TransformerImpl();
        List<Document> transformedValues = transformer.valueTransformer(aggregatedProducts,
                jsonConfigFiles.getTransformModel());

        //attribute transformer
        List<Document> transformedAttribute = transformer.attributeTransformer(transformedValues,
                jsonConfigFiles.getTransformModel());

        IndexService indexService = new IndexService();
        String algoliaApplicationId = jsonConfigFiles.getConfigurationModel().getAlgoliaApplicationId();
        String algoliaIndexName = jsonConfigFiles.getConfigurationModel().getAlgoliaIndexName();
        String algoliaAdminApiKey = jsonConfigFiles.getConfigurationModel().getAlgoliaAdminApiKey();

        //bulk index
        List<Document> indexedDocuments = indexService.bulkIndex(algoliaApplicationId, algoliaIndexName,
                algoliaAdminApiKey, transformedAttribute);
        logger.info("JSON indexed documents : " + indexedDocuments);
    }

    private static void handleXmlConnector(ConfigFileModel xmlConfigFiles) {

        // fetching product, inventory and price xml files for xml connector
        List<String> xmlFileKeys = List.of(Constants.INVENTORY_XML_FILE, Constants.PRICE_XML_FILE,
                Constants.PRODUCT_XML_FILE);

        String inventoryXml = null;
        String priceXml = null;
        String productXml = null;

        for (String fileKey : xmlFileKeys) {
            String xmlFilePath = xmlConfigFiles.getConfigurationModel().getSourceConfiguration().getFilePaths()
                    .get(fileKey);
            switch (fileKey) {
            case Constants.INVENTORY_XML_FILE:
                inventoryXml = xmlFilePath;
                break;
            case Constants.PRICE_XML_FILE:
                priceXml = xmlFilePath;
                break;
            case Constants.PRODUCT_XML_FILE:
                productXml = xmlFilePath;
                break;
            // Add more cases if needed
            default:
                // Handle the case where fileKey doesn't match any known case
                logger.warning("Unknown file key: " + fileKey);
                break;
            }
        }
        List<Document> productsXmlData = new ArrayList<>();
        List<Document> inventoriesXmlData = new ArrayList<>();
        List<Document> priceXmlData = new ArrayList<>();

        String finalProductXml = productXml;
        String finalInventoryXml = inventoryXml;
        String finalPriceXml = priceXml;

        // Assuming you have a map to store XML file paths for each collection
        Map<String, String> xmlFilePaths = new HashMap<>();
        xmlFilePaths.put(Constants.PRODUCT, finalProductXml);
        xmlFilePaths.put(Constants.INVENTORY, finalInventoryXml);
        xmlFilePaths.put(Constants.PRICE, finalPriceXml);

        xmlConfigFiles.getConfigurationModel().getSourceConfiguration().getCollectionConfiguration().forEach(config -> {
            String collectionName = config.getCollectionName();
            String xmlFilePath = xmlFilePaths.get(collectionName);

            if (xmlFilePath != null) {
                List<Document> data = XmlConnector.parseXmlFile(xmlFilePath, config.getCollectionType(),
                        config.getFieldsToFetch());
                switch (collectionName) {
                case Constants.PRODUCT:
                    productsXmlData.addAll(data);
                    break;
                case Constants.INVENTORY:
                    inventoriesXmlData.addAll(data);
                    break;
                case Constants.PRICE:
                    priceXmlData.addAll(data);
                    break;
                default:
                    // Handle the case where collectionName doesn't match any known case
                    logger.warning("Unknown collection name: " + collectionName);
                }
            } else {
                // Handle the case where XML file path is not available for the collection
                logger.warning("XML file path not found for collection: " + collectionName);
            }
        });
        List<Document> aggregatedDocuments = new ArrayList<>();
        productsXmlData.stream().forEach(productData -> {
            Document document = new Document();
            document.putAll(productData);
            String id = productData.get(Constants.ID).toString();
            Document inventory = JsonReader.fetchDataById(inventoriesXmlData, id);
            document.append(Constants.INVENTORY, inventory);
            Document price = JsonReader.fetchDataById(priceXmlData, id);
            document.append(Constants.PRICE, price);
            aggregatedDocuments.add(document);
        });

        IndexService indexService = new IndexService();
        String algoliaApplicationId = xmlConfigFiles.getConfigurationModel().getAlgoliaApplicationId();
        String algoliaIndexName = xmlConfigFiles.getConfigurationModel().getAlgoliaIndexName();
        String algoliaAdminApiKey = xmlConfigFiles.getConfigurationModel().getAlgoliaAdminApiKey();

        //value transformer
        Transformer transformer = new TransformerImpl();
        List<Document> transformedValues = transformer.valueTransformer(aggregatedDocuments,
                xmlConfigFiles.getTransformModel());

        //attribute transformer
        List<Document> transformedAttribute = transformer.attributeTransformer(transformedValues,
                xmlConfigFiles.getTransformModel());

        //bulk index
        List<Document> indexedDocuments = indexService.bulkIndex(algoliaApplicationId, algoliaIndexName,
                algoliaAdminApiKey, transformedAttribute);
        logger.info("XML indexed documents : " + indexedDocuments);
    }

    private static void handleApiConnector(ConfigFileModel apiConfigFiles) throws IOException {

        try (CloseableHttpClient httpClient = HttpClients.createDefault()) {
            Object sourceDetails = apiConfigFiles.getConfigurationModel().getSourceConfiguration().getSource();

            // Assuming sourceDetailsMap is a Map<String, Object>
            Map<String, Object> sourceDetailsMap = (Map<String, Object>) sourceDetails;

            // Get the value associated with the "urls" key
            Object urls = sourceDetailsMap.get(Constants.URLS);

            // Get the value associated with the "tokenCredentials" key
            Object tokenCredentials = sourceDetailsMap.get(Constants.TOKEN_CREDENTIALS);
            Map<String, Object> tokenCredentialsMap = (Map<String, Object>) tokenCredentials;

            String occtooProductsUrl = null;

            // Check if the value is a List
            if (urls instanceof List) {
                List<Object> urlsList = (List<Object>) urls;

                // Check if the list is not empty
                if (!urlsList.isEmpty()) {
                    // Get the 0th element from the list
                    Object firstUrl = urlsList.get(0);
                    occtooProductsUrl = firstUrl.toString();
                } else {
                    logger.warning("The 'urls' list is empty.");
                }
            } else {
                logger.warning("The value associated with 'urls' is not a List.");
            }

            // Specify the URL of the API endpoint
            String url = occtooProductsUrl;

            // Create an HTTP GET request
            HttpGet request = new HttpGet(url);

            // Credentials
            String dynamicId = tokenCredentialsMap.get(Constants.DYNAMIC_ID).toString();
            String clientId = tokenCredentialsMap.get(Constants.CLIENT_ID).toString();
            String clientSecret = tokenCredentialsMap.get(Constants.CLIENT_SECRET).toString();

            String accessToken = OcctooAccessTokenGenerator.generateAccessToken(dynamicId, clientId, clientSecret);
            request.setHeader(Constants.AUTHORIZATION, Constants.BEARER + accessToken);

            // Execute the request and get the response
            HttpResponse response = httpClient.execute(request);

            // Get the response code
            int statusCode = response.getStatusLine().getStatusCode();

            // Read the response from the API
            String responseBody = EntityUtils.toString(response.getEntity());
            ObjectMapper objectMapper = new ObjectMapper();

            // Parse the entire response into a Map
            Map<String, Object> responseMap = objectMapper.readValue(responseBody,
                    new TypeReference<Map<String, Object>>() {

                    });

            // Get the "results" array from the Map
            List<Map<String, Object>> results = (List<Map<String, Object>>) responseMap.get(Constants.RESULTS);

            // If you have a Document class, you can further convert these maps to Document objects
            List<Document> documentList = objectMapper.convertValue(results, new TypeReference<List<Document>>() {

            });
            IndexService indexService = new IndexService();
            String algoliaApplicationId = apiConfigFiles.getConfigurationModel().getAlgoliaApplicationId();
            String algoliaIndexName = apiConfigFiles.getConfigurationModel().getAlgoliaIndexName();
            String algoliaAdminApiKey = apiConfigFiles.getConfigurationModel().getAlgoliaAdminApiKey();

            // Bulk index
            List<Document> indexedDocuments = indexService.bulkIndex(algoliaApplicationId, algoliaIndexName,
                    algoliaAdminApiKey, documentList);
            logger.info("API indexed documents : " + indexedDocuments);
        }
    }

}
