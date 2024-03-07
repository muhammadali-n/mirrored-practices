package com.valoriz.algolia.model;

import java.util.List;

public class TransformModel {

    public List<TransformationRule> getTransformer() {
        return transformer;
    }

    public void setTransformer(List<TransformationRule> transformer) {
        this.transformer = transformer;
    }

    private List<TransformationRule> transformer;

}
