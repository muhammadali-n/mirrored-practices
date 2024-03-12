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
public class PriceTable {

    @JacksonXmlProperty(localName = "product-id", isAttribute = true)
    private String productId;

    @JacksonXmlProperty(localName = "online-from")
    private String onlineFrom;

    @JacksonXmlProperty(localName = "online-to")
    private String onlineTo;

    @JacksonXmlProperty(localName = "amount")
    private Double amount;
}
