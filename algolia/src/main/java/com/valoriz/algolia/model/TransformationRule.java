package com.valoriz.algolia.model;

public class TransformationRule {

    public String getInputFieldName() {
        return inputFieldName;
    }

    public void setInputFieldName(String inputFieldName) {
        this.inputFieldName = inputFieldName;
    }

    public String getOutputFieldName() {
        return outputFieldName;
    }

    public void setOutputFieldName(String outputFieldName) {
        this.outputFieldName = outputFieldName;
    }

    public String getConvertTo() {
        return convertTo;
    }

    public void setConvertTo(String convertTo) {
        this.convertTo = convertTo;
    }

    private String inputFieldName;

    private String outputFieldName;

    private String convertTo;

}
