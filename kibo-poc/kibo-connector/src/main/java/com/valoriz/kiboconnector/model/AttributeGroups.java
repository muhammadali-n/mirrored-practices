package com.valoriz.kiboconnector.model;

import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlElementWrapper;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;
import lombok.Data;

@Data
public class AttributeGroups {

    @JacksonXmlProperty(localName = "attribute-group")
    @JacksonXmlElementWrapper(useWrapping = false)
    private AttributeGroup attributeGroup;
}
