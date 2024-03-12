package com.valoriz.kiboconnector.entity;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Map;

import org.springframework.data.annotation.*;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.valoriz.kiboconnector.utils.ObjectIdSerializer;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public abstract class BaseEntity<PK extends Serializable> {

    private static final long serialVersionUID = 3976421566310196078L;

    @Id
    @JsonSerialize(using = ObjectIdSerializer.class)
    private PK id;

    @CreatedDate
    private LocalDateTime createdDate;

    @CreatedBy
    private String createdBy;

    @LastModifiedDate
    private LocalDateTime updatedDate;

    @LastModifiedBy
    private String updatedBy;

    @Version
    private Integer version;

    private String uniqueId;

    private boolean enabled = true;

    private String companyId;

    private Map<String, Object> customAttributes;
}
