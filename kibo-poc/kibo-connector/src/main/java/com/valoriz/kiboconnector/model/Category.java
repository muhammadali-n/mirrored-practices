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
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlElementWrapper;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;
import lombok.Data;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
public class Category {

    @JacksonXmlProperty(localName = "category-id", isAttribute = true)
    private String categoryId;

    @JacksonXmlProperty(localName = "display-name")
    @JacksonXmlElementWrapper(useWrapping = false)
    private List<DisplayName> displayNames;

    @JacksonXmlProperty(localName = "parent")
    private String parent;

    @JacksonXmlProperty(localName = "attribute-groups")
    private AttributeGroups attributeGroups;
}
