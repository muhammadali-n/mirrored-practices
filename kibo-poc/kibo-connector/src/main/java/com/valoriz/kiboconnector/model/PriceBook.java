package com.valoriz.kiboconnector.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;
import lombok.Data;

import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class PriceBook {

    @JacksonXmlProperty(localName = "header")
    private PriceBookHeader header;

    @JacksonXmlProperty(localName = "price-tables")
    private List<PriceTable> priceTables;
}
