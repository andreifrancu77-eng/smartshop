package com.backend.smartshop.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "product_specification")
public class ProductSpecification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "product_id")
    @JsonIgnore
    private Product product;

    private String screenSize;
    private String screenType;
    private String resolution;
    private String processor;
    private String ram;
    private String storage;
    private String batteryCapacity;
    private String cameraMain;
    private String cameraFront;
    private String osVersion;
    private String connectivity;
    private String weight;
    private String color;
}
