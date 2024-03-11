package com.valoriz.kiboconnector.service;

import org.springframework.stereotype.Service;

import java.io.File;


public interface PIMService {

    void processCatalogXmlFile(File xmlFile);

    void processPriceXmlFile(File xmlFile);

    void processInventoryXmlFile(File xmlFile);
}
