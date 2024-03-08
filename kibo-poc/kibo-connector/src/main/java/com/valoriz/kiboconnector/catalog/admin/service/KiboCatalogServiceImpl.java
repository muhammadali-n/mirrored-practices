package com.valoriz.kiboconnector.catalog.admin.service;

import com.kibocommerce.sdk.catalogadministration.api.ProductsApi;
import com.kibocommerce.sdk.catalogadministration.models.CatalogAdminsProduct;
import com.kibocommerce.sdk.common.ApiException;
import com.valoriz.kiboconnector.helper.KiboHelper;
import com.valoriz.kiboconnector.model.ImageGroup;
import com.valoriz.kiboconnector.model.Images;
import com.valoriz.kiboconnector.model.MasterCatalog;
import com.valoriz.kiboconnector.model.Product;
import com.valoriz.kiboconnector.utils.KiboConfigurationUtils;
import com.valoriz.kiboconnector.service.SequenceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.logging.Logger;

@Service
public class KiboCatalogServiceImpl implements KiboCatalogService {

    @Autowired
    KiboHelper kiboHelper;

    @Autowired
    SequenceService sequenceService;

    @Autowired
    KiboConfigurationUtils kiboConfigurationUtils;

    Logger logger = Logger.getLogger(KiboCatalogServiceImpl.class.getName());

    @Override
    public void addProducts(MasterCatalog masterCatalog) {
        try {

            // Build API Instance
            ProductsApi api = ProductsApi.builder().withConfig(kiboConfigurationUtils.getKiboConfiguration()).build();
            List<Product> masterCatalogProducts = masterCatalog.getProducts();
            String catalogId = masterCatalog.getCatalogId();
            for(Product product: masterCatalogProducts){
                String productSequence = generateProductSequence();
                int totalImagesCount = getTotalImagesInProductCount(product.getImages());
                List<String> imageSequenceIds = generateImageSequenceIds(totalImagesCount);
                CatalogAdminsProduct addProductRequest = kiboHelper.transformToCatalogAdminAddProductRequest(product, productSequence, catalogId, imageSequenceIds);
                try {
                    CatalogAdminsProduct addProductResponse = api.addProduct(addProductRequest);
                    logger.info("addProduct API response: " + addProductResponse);
                }
                catch (ApiException ex){
                    logger.severe("Exception occurred while calling add product API in Kibo, exception: " + ex.getMessage());
                }

            }
//            CatalogAdminsProduct product = api.getProduct("VALPRD001","");
//            ObjectMapper objectMapper = new ObjectMapper();
//            String jsonString = objectMapper.writeValueAsString(product);
//            logger.info("product: " + product);
        } catch (Exception ex) {
            logger.severe("Exception occurred while adding products in Kibo, exception: " + ex.getMessage());
        }

    }

    private String generateProductSequence(){
        String productSequence = sequenceService.getNextSequenceId("Product");
        return productSequence;
    }

    private List<String> generateImageSequenceIds(int count){
        List<String> imageSequenceIds = sequenceService.getNextSequenceIds("Image", count);
        return imageSequenceIds;
    }

    private int getTotalImagesInProductCount(Images images) {
        if (images == null || images.getImageGroup() == null) {
            return 0;
        }
        int totalImages = 0;
        // Iterate over each ImageGroup
        for (ImageGroup imageGroup : images.getImageGroup()) {
            // Check if ImageGroup has imageList
            if (imageGroup.getImageList() != null) {
                // Add the size of "imageList" to the total count
                totalImages += imageGroup.getImageList().size();
            }
        }
        return totalImages;
    }
}
