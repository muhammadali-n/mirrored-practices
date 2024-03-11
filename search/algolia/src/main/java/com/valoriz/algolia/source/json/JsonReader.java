package com.valoriz.algolia.source.json;

import com.valoriz.algolia.constants.Constants;
import com.valoriz.algolia.source.JsonConnector;
import org.bson.Document;
import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

public class JsonReader extends JsonConnector {

    public static List<Document> fetchDocuments(String jsonData, String collectionType, List<String> fieldsToFetch) {
        JSONObject jsonObject = new JSONObject(jsonData);
        JSONArray inventoryArray = jsonObject.getJSONArray(collectionType);

        List<Document> fetchedDocuments = new ArrayList<>();
        for (int i = 0; i < inventoryArray.length(); i++) {
            JSONObject item = inventoryArray.getJSONObject(i);
            Document fetchedDocument = new Document();
            fieldsToFetch.forEach(field -> fetchedDocument.put(field, item.get(field)));
            fetchedDocuments.add(fetchedDocument);
        }

        return fetchedDocuments;
    }

    public static Document fetchDataById(List<Document> documentList, String idToFetch) {
        return documentList.stream().filter(document -> idToFetch.equals(document.getString(Constants.ID))).findFirst()
                .orElse(null);
    }

}
