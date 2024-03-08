package com.valoriz.kiboconnector.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlElementWrapper;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;
import lombok.Data;

import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class ImageGroup {

    @JacksonXmlProperty(localName = "view-type", isAttribute = true)
    private String viewType;

    @JacksonXmlProperty(localName = "image")
    @JacksonXmlElementWrapper(useWrapping = false)
    private List<Image> imageList;

}
