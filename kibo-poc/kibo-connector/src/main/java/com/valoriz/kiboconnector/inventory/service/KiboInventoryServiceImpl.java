package com.valoriz.kiboconnector.inventory.service;

import com.valoriz.kiboconnector.catalog.admin.service.KiboCatalogServiceImpl;
import com.valoriz.kiboconnector.model.Inventory;
import org.springframework.stereotype.Service;

import java.util.logging.Logger;

@Service
public class KiboInventoryServiceImpl implements KiboInventoryService{


    Logger logger = Logger.getLogger(KiboInventoryServiceImpl.class.getName());

    public void updateProductsInventory(Inventory inventory){
        logger.info("Request received to update product's inventory to Kibo.");
    }
}
