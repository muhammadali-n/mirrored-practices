package com.valoriz.kiboconnector.service;

import com.fasterxml.jackson.core.exc.StreamReadException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;
import com.valoriz.kiboconnector.catalog.admin.service.KiboCatalogService;
import com.valoriz.kiboconnector.model.MasterCatalog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.util.logging.Logger;

@Service
public class PIMServiceImpl implements PIMService {

    @Autowired
    KiboCatalogService kiboCatalogService;

    Logger logger = Logger.getLogger(PIMServiceImpl.class.getName());

    @Override public void processXmlFile(File xmlFile) {
        logger.info("starting to process the xml file: " + xmlFile.toString());
        try {
            XmlMapper xmlMapper = new XmlMapper();
            MasterCatalog masterCatalog = xmlMapper.readValue(xmlFile, MasterCatalog.class);
            ObjectMapper objectMapper = new ObjectMapper();
            String jsonString = objectMapper.writeValueAsString(masterCatalog);
            logger.info("xml content converted to json format: " + jsonString);
            kiboCatalogService.addProducts(masterCatalog);
        } catch (StreamReadException ex) {
            logger.severe("Exception occurred while processing the xml: " + xmlFile.toString()
                    + "exception: " + ex.getMessage());
        } catch (IOException ex) {
            logger.severe("Exception occurred while processing the xml: " + xmlFile.toString()
                    + "exception: " + ex.getMessage());
        }
    }
}
