package com.valoriz.kiboconnector.model;

import lombok.Data;

import java.time.ZonedDateTime;

@Data
public class Price {

    private String isoCurrencyCode;

    private Double price;

    private Double salePrice;

    private Double msrp;

    private Double map;

    private ZonedDateTime mapStartDate;

    private ZonedDateTime mapEndDate;

    private Double creditValue;
}
