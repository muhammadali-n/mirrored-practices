package com.valoriz.algolia.source;

import org.bson.Document;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

public class XmlConnector implements Connector {

    public static String getXmlFilePath(String collectionName) {
        // Assuming your XML file names follow a specific pattern based on collectionName
        return "final" + collectionName.toLowerCase() + "Xml";
    }

    public static List<Document> parseXmlFile(String filePath, String elementTagName, List<String> fieldsToFetch) {
        List<Document> documents = new ArrayList<>();

        try {
            DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
            dbFactory.setFeature("http://apache.org/xml/features/disallow-doctype-decl", true);
            dbFactory.setFeature("http://xml.org/sax/features/external-general-entities", false);
            dbFactory.setFeature("http://xml.org/sax/features/external-parameter-entities", false);
            dbFactory.setFeature("http://apache.org/xml/features/nonvalidating/load-external-dtd", false);

            DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
            org.w3c.dom.Document doc = dBuilder.parse(new File(filePath));
            doc.getDocumentElement().normalize();

            NodeList elementList = doc.getElementsByTagName(elementTagName);

            for (int i = 0; i < elementList.getLength(); i++) {
                Element element = (Element) elementList.item(i);
                Document document = createDocument(fieldsToFetch, element);
                documents.add(document);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return documents;
    }

    private static Document createDocument(List<String> fieldsToFetch, Element element) {
        Document document = new Document();
        fieldsToFetch.forEach(field -> document.append(field, getTagValue(field, element)));
        return document;
    }

    private static String getTagValue(String tagName, Element element) {
        NodeList nodeList = element.getElementsByTagName(tagName).item(0).getChildNodes();
        Node node = nodeList.item(0);
        return node.getNodeValue();
    }

}
