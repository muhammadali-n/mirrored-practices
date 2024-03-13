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

package com.valoriz.kiboconnector.inventory.service;

import com.valoriz.kiboconnector.model.Inventory;

public interface KiboInventoryService {

    void updateProductsInventory(Inventory inventory);

    String getInventoryJobStatus(long jobId);
}
