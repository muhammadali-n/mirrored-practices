package com.valoriz.kiboconnector.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlElementWrapper;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;
import lombok.Data;

import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class Product {

    @JacksonXmlProperty(localName = "ean")
    private String ean;

    @JacksonXmlProperty(localName = "unit")
    private String unit;

    @JacksonXmlProperty(localName = "display-name")
    @JacksonXmlElementWrapper(useWrapping = false)
    private List<DisplayName> displayName;

    @JacksonXmlProperty(localName = "online-flag")
    private OnlineFlag onlineFlag;

    @JacksonXmlProperty(localName = "searchable-flag")
    private boolean searchableFlag;

    @JacksonXmlProperty(localName = "images")
    private Images images;

    @JacksonXmlProperty(localName = "custom-attributes")
    private List<CustomAttribute> customAttributes;

    @JacksonXmlProperty(localName = "options")
    private Options options;

    @JacksonXmlProperty(localName = "classification-category")
    private String classificationCategory;

}
