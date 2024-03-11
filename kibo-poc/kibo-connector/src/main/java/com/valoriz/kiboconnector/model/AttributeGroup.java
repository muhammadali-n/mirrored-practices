package com.valoriz.kiboconnector.model;

import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlElementWrapper;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;
import lombok.Data;

import java.util.List;

@Data
class AttributeGroup {

    @JacksonXmlProperty(localName = "group-id", isAttribute = true)
    private String groupId;

    @JacksonXmlProperty(localName = "display-name")
    @JacksonXmlElementWrapper(useWrapping = false)
    private List<DisplayName> displayNames;

    @JacksonXmlProperty(localName = "attribute")
    @JacksonXmlElementWrapper(useWrapping = false)
    private List<Attribute> attributes;
}
