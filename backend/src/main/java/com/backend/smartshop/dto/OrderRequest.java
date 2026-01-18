package com.backend.smartshop.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderRequest {

    private List<OrderItemRequest> items;
    private BigDecimal total;

    // Delivery Information
    private String deliveryName;
    private String deliveryEmail;
    private String deliveryPhone;
    private String deliveryAddress;
    private String deliveryCity;
    private String deliveryCounty;
    private String deliveryPostalCode;
    private String deliveryCountry;
    private String deliveryNotes;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class OrderItemRequest {
        private ProductReference product;
        private Integer quantity;
        private BigDecimal price;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ProductReference {
        private Long id;
    }
}
