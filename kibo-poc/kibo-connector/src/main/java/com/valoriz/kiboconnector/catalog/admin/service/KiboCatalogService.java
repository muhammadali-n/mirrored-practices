/**
 * Copyright(c) 2024 Valoriz Digital Private Ltd.
 *
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of Valoriz ("Confidential
 * Information"). You shall not disclose such Confidential Information and shall use it only in
 * accordance with the terms of the contract agreement you entered into with Valoriz.
 *
 * @author Saajid
 */

package com.valoriz.kiboconnector.catalog.admin.service;

import com.valoriz.kiboconnector.model.MasterCatalog;
import com.valoriz.kiboconnector.model.PriceBooks;

public interface KiboCatalogService {

    void addProducts(MasterCatalog masterCatalog);

    void updateProductsPrice(PriceBooks priceBooks);

}
