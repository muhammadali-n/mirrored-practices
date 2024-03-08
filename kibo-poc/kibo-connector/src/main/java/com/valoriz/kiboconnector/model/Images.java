package com.valoriz.kiboconnector.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlElementWrapper;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;
import lombok.Data;

import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class Images {

    @JacksonXmlProperty(localName = "merge-mode", isAttribute = true)
    private String mergeMode;

    @JacksonXmlProperty(localName = "image-group")
    @JacksonXmlElementWrapper(useWrapping = false)
    private List<ImageGroup> imageGroup;

}
