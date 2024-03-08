package com.valoriz.kiboconnector.model;

import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlText;
import lombok.Data;

@Data
class OnlineFlag {

    @JacksonXmlProperty(localName = "site-id", isAttribute = true)
    private String siteId;

    @JacksonXmlText
    private boolean value;
}
