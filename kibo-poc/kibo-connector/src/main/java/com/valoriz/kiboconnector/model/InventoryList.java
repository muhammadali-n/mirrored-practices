package com.valoriz.kiboconnector.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;
import lombok.Data;

import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class InventoryList {

    @JacksonXmlProperty(localName = "header")
    private InventoryListHeader header;

    @JacksonXmlProperty(localName = "records")
    private List<InventoryRecord> records;
}
