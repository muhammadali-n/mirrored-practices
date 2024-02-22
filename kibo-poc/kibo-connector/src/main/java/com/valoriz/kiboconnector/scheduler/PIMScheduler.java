package com.valoriz.kiboconnector.scheduler;


import com.valoriz.kiboconnector.service.PIMService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.io.File;
import java.util.logging.Logger;

@Component
@EnableScheduling
public class PIMScheduler {

    @Autowired
    private PIMService pimService;

    Logger logger = Logger.getLogger(PIMScheduler.class.getName());

    // Runs in every 5 mins
    @Scheduled(fixedDelay = 300000)
    public void exportProductInformation() {
        logger.info("starting PIMScheduler to pick and process xml files");
        try {
            File folder = new File("xml_files");
            logger.info("folder: " + folder.getAbsolutePath());
            if (folder.exists() && folder.isDirectory()) {
                File[] files = folder.listFiles((dir, name) -> name.endsWith(".xml"));
                logger.info("xml files in the given path: " + folder);
                if (files != null) {
                    for (File file : files) {
                        logger.info("calling service method to process the xml file: " + file.toString());
                        pimService.processXmlFile(file);
                    }
                }
            } else {
                logger.severe("Invalid xml folder path");
            }
        }
        catch (Exception ex){
            logger.severe("Exception occurred while running PIMScheduler, Exception: " + ex.getMessage());
        }


    }
}
