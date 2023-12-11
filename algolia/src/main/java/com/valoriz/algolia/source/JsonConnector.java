package com.valoriz.algolia.source;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class JsonConnector implements Connector {

    /**
     * This method is used to read json data from file path and convert to String
     *
     * @param filePath
     * @return String
     */
     public static String readJsonFile(String filePath) {
        try {
            Path path = Paths.get(filePath);
            return new String(Files.readAllBytes(path));
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }


}
