package com.valoriz.kiboconnector.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlText;
import lombok.Data;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data
class DisplayName {

    @JacksonXmlProperty(localName = "lang", isAttribute = true)
    private String lang;

    @JacksonXmlText
    private String value;
}
