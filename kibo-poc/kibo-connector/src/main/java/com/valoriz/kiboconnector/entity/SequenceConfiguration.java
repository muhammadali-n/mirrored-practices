package com.valoriz.kiboconnector.entity;

import lombok.Data;

@Data
public class SequenceConfiguration {

    private String prefix;

    private String suffix;

    private int nextValue;

    private int minLength;

    private char paddingCharacter;

    private int batchSize;

    private int randomNumberMaxLimit;
}
