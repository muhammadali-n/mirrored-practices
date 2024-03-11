package com.valoriz.kiboconnector.service;

import org.springframework.stereotype.Service;

import java.io.File;


public interface PIMService {

    void processXmlFile(File xmlFile);
}
