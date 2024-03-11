package com.valoriz.kiboconnector.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class InventoryListHeader {

    @JacksonXmlProperty(localName = "list-id", isAttribute = true)
    private String listId;

    @JacksonXmlProperty(localName = "default-instock")
    private boolean defaultInStock;

    @JacksonXmlProperty(localName = "description")
    private String description;
}
