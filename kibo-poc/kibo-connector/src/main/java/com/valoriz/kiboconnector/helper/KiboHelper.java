package com.valoriz.kiboconnector.helper;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;

import com.kibocommerce.sdk.catalogadministration.models.*;
import com.kibocommerce.sdk.inventory.models.RefreshItem;
import com.kibocommerce.sdk.inventory.models.RefreshRequest;
import com.valoriz.kiboconnector.model.*;

@Component
public class KiboHelper {

    public CatalogAdminsProduct transformToCatalogAdminsProduct(Product productData, String productSequence,
            String catalogId, List<String> imageSequenceIds) {
        CatalogAdminsProduct catalogAdminsProduct = new CatalogAdminsProduct();
        catalogAdminsProduct.setProductCode(productData.getProductId());
        catalogAdminsProduct.productUsage("Configurable");
        catalogAdminsProduct.setFulfillmentTypesSupported(Arrays.asList("DirectShip"));
        catalogAdminsProduct.setMasterCatalogId(1);
        catalogAdminsProduct.setProductSequence(Integer.parseInt(productSequence));
        catalogAdminsProduct.isValidForProductType(Boolean.TRUE);
        catalogAdminsProduct.setProductTypeId(3);
        catalogAdminsProduct.setBaseProductCode(null);
        catalogAdminsProduct.setProductInCatalogs(getCatalogs(productData, imageSequenceIds));
        catalogAdminsProduct.setContent(getLocalizationContent(productData, imageSequenceIds));
        catalogAdminsProduct.setPrice(getPriceInfo(productData.getSalesPrice(), productData.getListPrice()));
        catalogAdminsProduct.setPricingBehavior(getPricingBehavior());
        catalogAdminsProduct.isTaxable(Boolean.TRUE);
        catalogAdminsProduct.setInventoryInfo(getInventoryInfo());
        catalogAdminsProduct.isRecurring(Boolean.TRUE);
        catalogAdminsProduct.isPackagedStandAlone(Boolean.FALSE);
        catalogAdminsProduct.setStandAlonePackageType("CUSTOM");
        catalogAdminsProduct.setPackageHeight(getPAckageDimension(1.0, "in"));
        catalogAdminsProduct.setPackageLength(getPAckageDimension(1.0, "in"));
        catalogAdminsProduct.setPackageWeight(getPAckageDimension(1.0, "lbs"));
        catalogAdminsProduct.setPackageWidth(getPAckageDimension(1.0, "in"));
        catalogAdminsProduct.setApplicableDiscounts(null);
        catalogAdminsProduct.isVariation(Boolean.FALSE);
        catalogAdminsProduct.setVariationKey(null);
        catalogAdminsProduct.hasConfigurableOptions(Boolean.TRUE);
        catalogAdminsProduct.hasStandAloneOptions(Boolean.FALSE);
        catalogAdminsProduct.variationOptions(null);
        catalogAdminsProduct.setPublishingInfo(getPublishingInfo());
        catalogAdminsProduct.setBundledProducts(null);
        catalogAdminsProduct.setProductCollectionProducts(null);
        catalogAdminsProduct.setProductCollections(null);
        catalogAdminsProduct.setProductImageGroups(null);
        catalogAdminsProduct.setAuditInfo(getAdminUserAuditInfo(productData));
        catalogAdminsProduct.setSlicingSettings(getSlicingSettings(productData));
        catalogAdminsProduct.setPrimaryProductCollectionCode(null);
        return catalogAdminsProduct;
    }

    private SlicingSettings getSlicingSettings(Product productData) {
        SlicingSettings slicingSettings = new SlicingSettings();
        slicingSettings.setSlicingAttributeFqn(null);
        return slicingSettings;
    }

    private List<ProductInCatalogInfo> getCatalogs(Product productData, List<String> imageSequenceIds) {
        List<ProductInCatalogInfo> catalogs = new ArrayList<>();
        ProductInCatalogInfo productInCatalogInfo = new ProductInCatalogInfo();
        productInCatalogInfo.setCatalogId(1);
        productInCatalogInfo.setIsActive(Boolean.TRUE);
        productInCatalogInfo.setIsContentOverridden(Boolean.TRUE);
        productInCatalogInfo.setContent(getLocalizationContent(productData, imageSequenceIds));
        productInCatalogInfo.setIsPriceOverridden(Boolean.FALSE);
        productInCatalogInfo.setPrice(getPriceInfo(productData.getSalesPrice(), productData.getListPrice()));
        productInCatalogInfo.setIsSeoContentOverridden(Boolean.TRUE);
        productInCatalogInfo.setSeoContent(getSeoContent(productData));
        // productInCatalogInfo.setProductCategories(null);
        // productInCatalogInfo.setPrimaryProductCategory(getPrimaryProductCategory(productData));
        productInCatalogInfo.setDateFirstAvailableInCatalog(OffsetDateTime.now());
        productInCatalogInfo.setActiveDateRange(getActiveDateRange(productData));
        productInCatalogInfo.setAuditInfo(getAdminUserAuditInfo(productData));
        catalogs.add(productInCatalogInfo);
        return catalogs;
    }

    private AdminUserAuditInfo getAdminUserAuditInfo(Product productData) {
        AdminUserAuditInfo adminUserAuditInfo = new AdminUserAuditInfo();
        adminUserAuditInfo.setUpdateDate(OffsetDateTime.now());
        adminUserAuditInfo.setCreateDate(OffsetDateTime.now());
        adminUserAuditInfo.setUpdateBy(null);
        adminUserAuditInfo.setCreateBy(null);
        return adminUserAuditInfo;
    }

    private CatalogAdminsActiveDateRange getActiveDateRange(Product productData) {
        CatalogAdminsActiveDateRange activeDateRange = new CatalogAdminsActiveDateRange();
        activeDateRange.startDate(OffsetDateTime.now());
        activeDateRange.setEndDate(OffsetDateTime.now().plusYears(7));
        return activeDateRange;
    }

    private ProductCategory getPrimaryProductCategory(Product productData) {
        ProductCategory primaryProductCategory = new ProductCategory();
        primaryProductCategory.setCategoryId(1);
        return primaryProductCategory;
    }

    private ProductLocalizedSEOContent getSeoContent(Product productData) {
        ProductLocalizedSEOContent localizedSEOContent = new ProductLocalizedSEOContent();
        localizedSEOContent.setLocaleCode("en");
        localizedSEOContent.setMetaTagTitle(null);
        localizedSEOContent.setMetaTagDescription(null);
        localizedSEOContent.setMetaTagKeywords(null);
        localizedSEOContent.setTitleTagTitle(null);
        localizedSEOContent.setSeoFriendlyUrl(null);
        return localizedSEOContent;
    }

    private ProductPublishingInfo getPublishingInfo() {
        ProductPublishingInfo productPublishingInfo = new ProductPublishingInfo();
        productPublishingInfo.publishedState("Live");
        productPublishingInfo.setLastPublishedBy(null);
        productPublishingInfo.setLastPublishedDate(null);
        productPublishingInfo.setPublishSetCode(null);
        return productPublishingInfo;
    }

    private CommerceRuntimeMeasurement getPAckageDimension(double value, String unit) {
        CommerceRuntimeMeasurement commerceRuntimeMeasurement = new CommerceRuntimeMeasurement();
        commerceRuntimeMeasurement.setUnit(unit);
        commerceRuntimeMeasurement.setValue(value);
        return commerceRuntimeMeasurement;
    }

    private CatalogAdminsProductInventoryInfo getInventoryInfo() {
        CatalogAdminsProductInventoryInfo inventoryInfo = new CatalogAdminsProductInventoryInfo();
        inventoryInfo.setManageStock(Boolean.TRUE);
        inventoryInfo.setOutOfStockBehavior("DisplayMessage");
        return inventoryInfo;
    }

    private CatalogAdminsProductPricingBehaviorInfo getPricingBehavior() {
        CatalogAdminsProductPricingBehaviorInfo pricingBehavior = new CatalogAdminsProductPricingBehaviorInfo();
        pricingBehavior.discountsRestricted(Boolean.FALSE);
        pricingBehavior.setDiscountsRestrictedStartDate(null);
        pricingBehavior.setDiscountsRestrictedEndDate(null);
        pricingBehavior.setVariationPricingMethod("Fixed");
        return pricingBehavior;
    }

    private CatalogAdminsProductPrice getPriceInfo(Double salesPrice, Double listPrice) {
        CatalogAdminsProductPrice catalogAdminsProductPrice = new CatalogAdminsProductPrice();
        catalogAdminsProductPrice.setPrice(listPrice);
        catalogAdminsProductPrice.setCreditValue(null);
        catalogAdminsProductPrice.setIsoCurrencyCode("AED");
        catalogAdminsProductPrice.setMap(null);
        catalogAdminsProductPrice.setMapStartDate(null);
        catalogAdminsProductPrice.setMapEndDate(null);
        catalogAdminsProductPrice.setSalePrice(salesPrice);
        return catalogAdminsProductPrice;
    }

    private ProductLocalizedContent getLocalizationContent(Product productData, List<String> imageSequenceIds) {
        ProductLocalizedContent productLocalizedContent = new ProductLocalizedContent();
        productLocalizedContent.setLocaleCode("en-US");
        productLocalizedContent.setProductName(getProductName(productData.getDisplayName()));
        productLocalizedContent.setProductShortDescription(constructProductDescription(productData));
        productLocalizedContent.setProductFullDescription(constructProductDescription(productData));
        productLocalizedContent.setProductImages(getProductImages(productData.getImages(), imageSequenceIds));
        return productLocalizedContent;
    }

    private String constructProductDescription(Product productData) {
        List<String> keyFeatureIds = Arrays.asList("keyFeature1", "keyFeature2", "keyFeature3", "keyFeature4");
        StringBuilder productDescriptionBuilder = new StringBuilder();
        for (String keyFeatureId : keyFeatureIds) {
            Optional<CustomAttribute> optionalKeyFeature = productData
                    .getCustomAttributes()
                    .stream()
                    .filter(
                            attribute -> "en-AE".equals(attribute.getLang())
                                    && keyFeatureId.equals(attribute.getAttributeId()))
                    .findFirst();

            optionalKeyFeature.ifPresent(attribute -> {
                if (productDescriptionBuilder.length() > 0) {
                    productDescriptionBuilder.append(", ");
                }
                productDescriptionBuilder.append(attribute.getValue());
            });
        }

        // Append full stop at the end
        productDescriptionBuilder.append(".");
        return productDescriptionBuilder.toString();
    }

    private String getProductName(List<DisplayName> displayNames) {
        String productName = "";
        Optional<DisplayName> displayNameOptional = displayNames
                .stream()
                .filter(displayName -> "en-AE".equals(displayName.getLang()))
                .findFirst();

        // Check if the value is present
        if (displayNameOptional.isPresent()) {
            DisplayName displayName = displayNameOptional.get();
            productName = displayName.getValue();
        }
        return productName;
    }

    private List<ProductLocalizedImage> getProductImages(Images images, List<String> imageSequenceIds) {
        List<ProductLocalizedImage> productLocalizedImages = new ArrayList<>();
        if (images != null && !CollectionUtils.isEmpty(imageSequenceIds)) {
            List<ImageGroup> imageGroup = images.getImageGroup();
            for (ImageGroup image : imageGroup) {
                List<Image> imageList = image.getImageList();
                int index = 0;
                for (Image item : imageList) {
                    ProductLocalizedImage productLocalizedImage = new ProductLocalizedImage();
                    productLocalizedImage.setCmsId("");
                    productLocalizedImage.setLocaleCode("en-US");
                    productLocalizedImage.setImageUrl(item.getPath());
                    productLocalizedImage.setSequence(Integer.parseInt(imageSequenceIds.get(index)));
                    productLocalizedImage.setId(Integer.parseInt(imageSequenceIds.get(index)));
                    productLocalizedImages.add(productLocalizedImage);
                    index++;
                }
            }
        }
        return productLocalizedImages;
    }

    public CatalogAdminsProduct transformToUpdateProductRequest(PriceTable priceTable, String productName) {
        CatalogAdminsProduct catalogAdminsProduct = new CatalogAdminsProduct();
        catalogAdminsProduct.setProductCode(priceTable.getProductId());
        ProductLocalizedContent content = new ProductLocalizedContent();
        content.setProductName(productName);
        catalogAdminsProduct.setContent(content);
        CatalogAdminsProductPrice price = new CatalogAdminsProductPrice();
        price.setPrice(priceTable.getAmount());
        catalogAdminsProduct.setPrice(price);
        return catalogAdminsProduct;
    }

    public RefreshRequest transformToRefreshRequest(List<InventoryRecord> inventoryRecords, String locationCode) {
        RefreshRequest refreshRequest = new RefreshRequest();
        List<RefreshItem> refreshItems = new ArrayList<>();
        refreshRequest.setLocationCode(locationCode);
        for (InventoryRecord inventoryRecord : inventoryRecords) {
            RefreshItem refreshItem = new RefreshItem();
            refreshItem.setUpc(inventoryRecord.getProductId());
            refreshItem.setQuantity((int) inventoryRecord.getAllocation());
            refreshItems.add(refreshItem);
        }
        refreshRequest.setItems(refreshItems);
        return refreshRequest;
    }
}
