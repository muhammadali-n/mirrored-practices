package com.valoriz.kiboconnector.catalog.admin.service;

import com.valoriz.kiboconnector.model.MasterCatalog;
import com.valoriz.kiboconnector.model.PriceBooks;

public interface KiboCatalogService {

    void addProducts(MasterCatalog masterCatalog);

    void updateProductsPrice(PriceBooks priceBooks);

}
