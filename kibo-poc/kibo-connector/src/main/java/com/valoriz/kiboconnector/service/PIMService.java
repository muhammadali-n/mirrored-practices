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

package com.valoriz.kiboconnector.service;

import java.io.File;

public interface PIMService {

    void processCatalogXmlFile(File xmlFile);

    void processPriceXmlFile(File xmlFile);

    void processInventoryXmlFile(File xmlFile);
}
