package com.valoriz.kiboconnector.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlRootElement;
import lombok.Data;

@Data
@JacksonXmlRootElement(localName = "pricebooks")
@JsonIgnoreProperties(ignoreUnknown = true)
public class PriceBooks {

    @JacksonXmlProperty(localName = "xmlns", isAttribute = true)
    private String xmlns;

    @JacksonXmlProperty(localName = "pricebook")
    private PriceBook priceBook;
}
