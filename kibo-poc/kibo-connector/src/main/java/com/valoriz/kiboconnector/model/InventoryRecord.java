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

package com.valoriz.kiboconnector.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;

import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class InventoryRecord {

    @JacksonXmlProperty(localName = "product-id", isAttribute = true)
    private String productId;

    @JacksonXmlProperty(localName = "allocation")
    private double allocation;

    @JacksonXmlProperty(localName = "allocation-timestamp")
    private String allocationTimestamp;

    @JacksonXmlProperty(localName = "preorder-backorder-handling")
    private String preOrderBackorderHandling;

    @JacksonXmlProperty(localName = "preorder-backorder-allocation")
    private Double preOrderBackorderAllocation;
}
