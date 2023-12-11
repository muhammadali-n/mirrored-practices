package com.valoriz.algolia.destination;

import com.algolia.search.DefaultSearchClient;
import com.algolia.search.SearchClient;
import com.algolia.search.SearchIndex;
import com.valoriz.algolia.constants.Constants;
import org.bson.Document;

import java.util.ArrayList;
import java.util.List;

public class IndexService {

    private SearchIndex<Document> initIndex(String algoliaApplicationId, String algoliaIndexName,
            String algoliaAdminApiKey) {
        SearchClient client = DefaultSearchClient.create(algoliaApplicationId, algoliaAdminApiKey);
        return client.initIndex(algoliaIndexName, Document.class);
    }

    /**
     * This method is used to bulk index
     *
     * @param algoliaApplicationId
     * @param algoliaIndexName
     * @param algoliaAdminApiKey
     * @param indexObjects
     * @return indexObjects
     */
    public List<Document> bulkIndex(String algoliaApplicationId, String algoliaIndexName, String algoliaAdminApiKey,
            List<Document> indexObjects) {
        SearchIndex<Document> index = initIndex(algoliaApplicationId, algoliaIndexName, algoliaAdminApiKey);
        index.saveObjects(indexObjects, true).waitTask();
        return indexObjects;
    }

    /**
     * This method is used to partial index
     *
     * @param algoliaApplicationId
     * @param algoliaIndexName
     * @param algoliaAdminApiKey
     * @param indexObjects
     * @return indexObjects
     */
    public List<Document> partialUpdate(String algoliaApplicationId, String algoliaIndexName, String algoliaAdminApiKey,
            List<Document> indexObjects) {
        SearchIndex<Document> index = initIndex(algoliaApplicationId, algoliaIndexName, algoliaAdminApiKey);
        index.partialUpdateObjects(indexObjects, true).waitTask();
        return indexObjects;
    }

    /**
     * This method is used to update single object
     *
     * @param algoliaApplicationId
     * @param algoliaIndexName
     * @param algoliaAdminApiKey
     * @param indexObject
     * @return indexObject
     */
    public Document updateSingleObject(String algoliaApplicationId, String algoliaIndexName, String algoliaAdminApiKey,
            Document indexObject) {
        SearchIndex<Document> index = initIndex(algoliaApplicationId, algoliaIndexName, algoliaAdminApiKey);
        index.partialUpdateObject(indexObject, true).waitTask();
        return indexObject;
    }

    // Fetch documents by a list of _id values
    public List<Document> getDocumentsByIds(List<Document> documents, List<String> targetIds) {
        List<Document> foundDocuments = new ArrayList<>();

        for (Document document : documents) {
            // Assuming _id is directly accessible in the Document class
            if (targetIds.contains(document.get(Constants.OBJECT_ID))) {
                foundDocuments.add(document);
            }
        }

        return foundDocuments;
    }

}
