package com.backend.smartshop.dto;

import com.backend.smartshop.domain.OrderStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderResponse {

    private Long id;
    private String orderCode;
    private BigDecimal total;
    private OrderStatus status;
    private LocalDateTime createdAt;

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

    private List<OrderItemResponse> items;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class OrderItemResponse {
        private Long id;
        private String productName;
        private Integer quantity;
        private BigDecimal price;
        private BigDecimal subtotal;
    }
}
