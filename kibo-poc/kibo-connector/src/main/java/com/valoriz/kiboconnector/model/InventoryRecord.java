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
    private Double allocation;

    @JacksonXmlProperty(localName = "allocation-timestamp")
    private String allocationTimestamp;

    @JacksonXmlProperty(localName = "preorder-backorder-handling")
    private String preOrderBackorderHandling;

    @JacksonXmlProperty(localName = "preorder-backorder-allocation")
    private Double preOrderBackorderAllocation;
}
