package com.valoriz.kiboconnector.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlRootElement;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlText;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class CustomAttribute {

    @JacksonXmlProperty(localName = "attribute-id", isAttribute = true)
    private String attributeId;

    @JacksonXmlProperty(localName = "lang", isAttribute = true)
    private String lang;

    @JacksonXmlText
    private String value;

}
