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
public class PriceBookHeader {

    @JacksonXmlProperty(localName = "pricebook-id", isAttribute = true)
    private String pricebookId;

    @JacksonXmlProperty(localName = "currency")
    private String currency;

    @JacksonXmlProperty(localName = "display-name")
    private DisplayName displayName;

    @JacksonXmlProperty(localName = "description")
    private String description;

    @JacksonXmlProperty(localName = "online-flag")
    private boolean onlineFlag;

}