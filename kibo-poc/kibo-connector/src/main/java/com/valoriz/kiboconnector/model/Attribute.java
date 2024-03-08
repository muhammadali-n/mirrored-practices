package com.valoriz.kiboconnector.model;

import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;
import lombok.Data;

@Data
class Attribute {

    @JacksonXmlProperty(localName = "attribute-id", isAttribute = true)
    private String attributeId;

    @JacksonXmlProperty(isAttribute = true)
    private boolean system;
}
