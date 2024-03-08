package com.valoriz.kiboconnector.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlElementWrapper;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlRootElement;
import lombok.Data;

import java.util.List;

@Data
@JacksonXmlRootElement(localName = "catalog")
@JsonIgnoreProperties(ignoreUnknown = true)
public class MasterCatalog {


    @JacksonXmlProperty(localName = "xmlns", isAttribute = true)
    private String xmlns;

    @JacksonXmlProperty(localName = "catalog-id", isAttribute = true)
    private String catalogId;

    @JacksonXmlProperty(localName = "header")
    private String header;

    @JacksonXmlProperty(localName = "category")
    @JacksonXmlElementWrapper(useWrapping = false)
    private List<Category> categories;

    @JacksonXmlProperty(localName = "product")
    @JacksonXmlElementWrapper(useWrapping = false)
    private List<Product> products;
}
