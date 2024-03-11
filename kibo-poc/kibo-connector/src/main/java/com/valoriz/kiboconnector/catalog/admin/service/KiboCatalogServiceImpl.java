package com.valoriz.kiboconnector.catalog.admin.service;

import com.kibocommerce.sdk.catalogadministration.api.ProductsApi;
import com.kibocommerce.sdk.catalogadministration.models.CatalogAdminsProduct;
import com.kibocommerce.sdk.catalogadministration.models.CatalogAdminsProductPrice;
import com.kibocommerce.sdk.catalogadministration.models.ProductLocalizedContent;
import com.kibocommerce.sdk.catalogadministration.models.ProductLocalizedImage;
import com.kibocommerce.sdk.common.ApiException;
import com.valoriz.kiboconnector.helper.KiboHelper;
import com.valoriz.kiboconnector.model.*;
import com.valoriz.kiboconnector.service.SequenceService;
import com.valoriz.kiboconnector.utils.KiboConfigurationUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

@Service
public class KiboCatalogServiceImpl implements KiboCatalogService {

    @Autowired KiboHelper kiboHelper;

    @Autowired SequenceService sequenceService;

    @Autowired KiboConfigurationUtils kiboConfigurationUtils;

    Logger logger = Logger.getLogger(KiboCatalogServiceImpl.class.getName());

    @Override
    public void addProducts(MasterCatalog masterCatalog) {
        try {

            // Build API Instance
            ProductsApi api = ProductsApi.builder().withConfig(kiboConfigurationUtils.getKiboConfiguration()).build();
            List<Product> masterCatalogProducts = masterCatalog.getProducts();
            String catalogId = masterCatalog.getCatalogId();
            for (Product product : masterCatalogProducts) {
                String productCode = product.getProductId();

                //calling getProduct API to fetch product details
                CatalogAdminsProduct productDetails = getProductDetails(productCode, api);
                if (productDetails == null) {
                    //product doesn't exist in Kibo, hence we need to add the product.
                    String productSequence = generateProductSequence();
                    int totalImagesCount = getTotalImagesCountInProduct(product.getImages());
                    List<String> imageSequenceIds = generateImageSequenceIds(totalImagesCount);
                    CatalogAdminsProduct addProductRequest = kiboHelper.transformToCatalogAdminsProduct(product,
                            productSequence,
                            catalogId,
                            imageSequenceIds);
                    try {
                        logger.info("Calling Kibo - add product API with request: " + addProductRequest);
                        CatalogAdminsProduct addProductResponse = api.addProduct(addProductRequest);
//                        logger.info("addProduct API response: " + addProductResponse);
                    } catch (ApiException ex) {
                        logger.severe("Exception occurred while calling add product API in Kibo, exception: " + ex.getMessage());
                    }
                }
                else {
                    //product already exist in Kibo, hence we need to update product instead of adding product.
                    String productSequence = String.valueOf(productDetails.getProductSequence());
                    List<String> imageSequenceIds = new ArrayList<>();
                    CatalogAdminsProduct updateProductRequest = kiboHelper.transformToCatalogAdminsProduct(product,
                            productSequence,
                            catalogId,
                            imageSequenceIds);
                    ProductLocalizedContent content = productDetails.getContent();
                    List<ProductLocalizedImage> productImages = content.getProductImages();
                    updateProductRequest.getContent().setProductImages(productImages);
                    try {
                        logger.info("Calling Kibo - update product API with request: " + updateProductRequest);
                        CatalogAdminsProduct updateProductResponse = api.updateProduct(productCode, updateProductRequest);
//                        logger.info("updateProduct API response: " + updateProductResponse);
                    } catch (ApiException ex) {
                        logger.severe("Exception occurred while calling updating product API in Kibo, exception: " + ex.getMessage());
                    }
                }
            }
        } catch (Exception ex) {
            logger.severe("Exception occurred while adding products in Kibo, exception: " + ex.getMessage());
        }
    }

    private String generateProductSequence() {
        String productSequence = sequenceService.getNextSequenceId("Product");
        return productSequence;
    }

    private List<String> generateImageSequenceIds(int count) {
        List<String> imageSequenceIds = sequenceService.getNextSequenceIds("Image", count);
        return imageSequenceIds;
    }

    private int getTotalImagesCountInProduct(Images images) {
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

    @Override
    public void updateProductsPrice(PriceBooks priceBooks) {
        try {
            // Build API Instance
            ProductsApi api = ProductsApi.builder().withConfig(kiboConfigurationUtils.getKiboConfiguration()).build();
            List<PriceTable> priceTables = priceBooks.getPriceBook().getPriceTables();
            for (PriceTable priceTable : priceTables) {
                String productCode = priceTable.getProductId();

                //calling getProduct API to fetch product details
                CatalogAdminsProduct productDetails = getProductDetails(productCode, api);
                if (productDetails != null) {
                    CatalogAdminsProduct updateProductRequest = updateProductDetailsWithPrice(productDetails, priceTable);
                    try {
                        CatalogAdminsProduct addProductResponse = api.updateProduct(productCode, updateProductRequest);
                        logger.info("updateProduct API response: " + addProductResponse);
                    } catch (ApiException ex) {
                        logger.severe("Exception occurred while calling updating product API in Kibo, exception: " + ex.getMessage());
                    }
                } else {
                    logger.warning("Product details not found for the product with productCode: " + productCode);
                }
            }
            //            CatalogAdminsProduct product = api.getProduct("VALPRD001","");
            //            ObjectMapper objectMapper = new ObjectMapper();
            //            String jsonString = objectMapper.writeValueAsString(product);
            //            logger.info("product: " + product);
        } catch (Exception ex) {
            logger.severe("Exception occurred while updating products in Kibo, exception: " + ex.getMessage());
        }
    }

    private CatalogAdminsProduct getProductDetails(String productCode, ProductsApi api) {
        try {
            CatalogAdminsProduct productDetails = api.getProduct(productCode, "");
            return productDetails;
        } catch (ApiException ex) {
            return null;
        }
    }

    private CatalogAdminsProduct updateProductDetailsWithPrice(CatalogAdminsProduct productDetails, PriceTable priceTable) {
        CatalogAdminsProductPrice price = productDetails.getPrice();
        price.setPrice(priceTable.getAmount());
        return productDetails;
    }

    private String fetchProductName(CatalogAdminsProduct productDetails) {
        String productName = "";
        ProductLocalizedContent content = productDetails.getContent();
        if (content != null) {
            productName = content.getProductName();
        }
        return productName;
    }
}
