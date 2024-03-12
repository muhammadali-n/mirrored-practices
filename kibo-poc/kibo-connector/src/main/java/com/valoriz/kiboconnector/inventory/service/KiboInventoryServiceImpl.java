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

import java.util.List;
import java.util.Objects;
import java.util.logging.Logger;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kibocommerce.sdk.common.ApiException;
import com.kibocommerce.sdk.inventory.api.InventoryJobApi;
import com.kibocommerce.sdk.inventory.api.ModifyInventoryApi;
import com.kibocommerce.sdk.inventory.models.JobIDResponse;
import com.kibocommerce.sdk.inventory.models.JobQueueResponse;
import com.kibocommerce.sdk.inventory.models.RefreshRequest;
import com.valoriz.kiboconnector.helper.KiboHelper;
import com.valoriz.kiboconnector.model.Inventory;
import com.valoriz.kiboconnector.model.InventoryList;
import com.valoriz.kiboconnector.model.InventoryListHeader;
import com.valoriz.kiboconnector.model.InventoryRecord;
import com.valoriz.kiboconnector.utils.KiboConfigurationUtils;

@Service
public class KiboInventoryServiceImpl implements KiboInventoryService {

    @Autowired
    KiboHelper kiboHelper;

    @Autowired
    KiboConfigurationUtils kiboConfigurationUtils;

    Logger logger = Logger.getLogger(KiboInventoryServiceImpl.class.getName());

    @Override
    public void updateProductsInventory(Inventory inventory) {
        logger.info("Request received to update product's inventory to Kibo.");
        try {

            // Build API Instance
            ModifyInventoryApi api = ModifyInventoryApi
                    .builder()
                    .withConfig(kiboConfigurationUtils.getKiboConfiguration())
                    .build();
            if (inventory.getInventoryList() != null) {
                String locationCode = extractLocationCode(inventory.getInventoryList());
                if (StringUtils.isNotBlank(locationCode)) {
                    List<InventoryRecord> inventoryRecords = inventory.getInventoryList().getRecords();
                    RefreshRequest inventoryUpdateRequest = kiboHelper
                            .transformToRefreshRequest(inventoryRecords, "VALLOC003");
                    try {
                        logger.info("Calling Kibo - inventory refresh API with request: " + inventoryUpdateRequest);
                        JobIDResponse inventoryUpdateResponse = api.refresh(42366, inventoryUpdateRequest);
                        logger.info("inventory refresh API response: " + inventoryUpdateResponse);

                        String inventoryJobStatus;

                        // Checking the status of inventory job every 2 seconds until job status becomes success.
                        long interval = 2000;
                        do {
                            long startTime = System.currentTimeMillis();
                            inventoryJobStatus = getInventoryJobStatus(
                                    Objects.requireNonNull(inventoryUpdateResponse.getJobID()).longValue());
                            long elapsedTime = System.currentTimeMillis() - startTime;

                            // Calculate the remaining time to sleep
                            long sleepTime = interval - elapsedTime;
                            if (sleepTime > 0) {
                                try {
                                    // Sleep for the remaining time
                                    Thread.sleep(sleepTime);
                                } catch (InterruptedException e) {
                                    e.printStackTrace();
                                }
                            }
                        } while (!"SUCCESS".equals(inventoryJobStatus));
                        logger
                                .info(
                                        "inventory job with jobId: " + inventoryUpdateResponse.getJobID()
                                                + " have been completed");
                    } catch (ApiException ex) {
                        logger
                                .severe(
                                        "Exception occurred while calling inventory refresh API in Kibo, exception: "
                                                + ex.getMessage());
                    }
                } else {
                    logger.severe("inventory location id is blank or empty, hence inventory update failed ");
                }
            } else {
                logger.severe("inventory list is empty, hence inventory update failed ");
            }
        } catch (Exception ex) {
            logger.severe("Exception occurred while updating inventory in Kibo, exception: " + ex.getMessage());
        }
    }

    @Override
    public String getInventoryJobStatus(long jobId) {
        String status = "PENDING";
        try {

            // Build API Instance
            InventoryJobApi api = InventoryJobApi
                    .builder()
                    .withConfig(kiboConfigurationUtils.getKiboConfiguration())
                    .build();
            try {
                logger.info("Calling Kibo - inventory get job API with jobId: " + jobId);
                JobQueueResponse getInventoryJobResponse = api.getJob(42366, jobId);
                logger.info("inventory get job API response: " + getInventoryJobResponse);
                status = Objects.requireNonNull(getInventoryJobResponse.getStatus()).toString();
            } catch (ApiException ex) {
                logger
                        .severe(
                                "Exception occurred while calling inventory get job API in Kibo, exception: "
                                        + ex.getMessage());
            }
        } catch (Exception ex) {
            logger.severe("Exception occurred while inventory job status from kibo: " + ex.getMessage());
        }
        return status;
    }

    private String extractLocationCode(InventoryList inventoryList) {
        String locationCode = "";
        InventoryListHeader inventoryListHeader = inventoryList.getHeader();
        if (inventoryListHeader != null) {
            String listId = inventoryListHeader.getListId();

            // Check if the input string is at least four characters long
            if (listId.length() >= 4) {
                locationCode = listId.substring(listId.length() - 4);
            }
        }
        return locationCode;
    }
}
