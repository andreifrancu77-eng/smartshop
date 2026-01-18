package com.backend.smartshop.service;

import com.backend.smartshop.domain.Order;
import com.backend.smartshop.domain.OrderItem;
import com.backend.smartshop.domain.OrderStatus;
import com.backend.smartshop.domain.Product;
import com.backend.smartshop.domain.User;
import com.backend.smartshop.dto.OrderRequest;
import com.backend.smartshop.dto.OrderResponse;
import com.backend.smartshop.repository.OrderRepository;
import com.backend.smartshop.repository.ProductRepository;
import com.backend.smartshop.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class OrderService {

    private final OrderRepository repository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final EmailService emailService;

    public List<Order> getOrdersByUser(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        return repository.findByUserId(user.getId());
    }

    @Transactional
    public OrderResponse createOrder(OrderRequest request, String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));

        Order order = Order.builder()
                .user(user)
                .total(request.getTotal())
                .status(OrderStatus.PENDING)
                .orderCode(generateOrderCode())
                .deliveryName(request.getDeliveryName())
                .deliveryEmail(request.getDeliveryEmail())
                .deliveryPhone(request.getDeliveryPhone())
                .deliveryAddress(request.getDeliveryAddress())
                .deliveryCity(request.getDeliveryCity())
                .deliveryCounty(request.getDeliveryCounty())
                .deliveryPostalCode(request.getDeliveryPostalCode())
                .deliveryCountry(request.getDeliveryCountry())
                .deliveryNotes(request.getDeliveryNotes())
                .build();

        List<OrderItem> orderItems = request.getItems().stream().map(itemRequest -> {
            Product product = productRepository.findById(itemRequest.getProduct().getId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));

            return OrderItem.builder()
                    .order(order)
                    .product(product)
                    .quantity(itemRequest.getQuantity())
                    .price(itemRequest.getPrice())
                    .build();
        }).collect(Collectors.toList());

        order.setItems(orderItems);
        Order savedOrder = repository.save(order);

        log.info("Created order {} for user {}", savedOrder.getOrderCode(), email);

        // Send confirmation email to customer and notification to admin
        OrderResponse orderResponse = mapToOrderResponse(savedOrder);
        try {
            log.info("Attempting to send confirmation email to {} for order {}",
                    orderResponse.getDeliveryEmail(), savedOrder.getOrderCode());
            emailService.sendOrderConfirmationEmail(orderResponse);
        } catch (Exception emailError) {
            // Don't fail the order creation if email fails
            log.error("✗ Failed to send confirmation email for order {} to {}: {}",
                    savedOrder.getOrderCode(), orderResponse.getDeliveryEmail(), emailError.getMessage());
            if (emailError.getCause() != null) {
                log.error("Email error cause: {}", emailError.getCause().getMessage());
            }
        }

        // Send admin notification email
        try {
            emailService.sendAdminNotificationEmail(orderResponse);
        } catch (Exception emailError) {
            // Don't fail the order creation if admin notification fails
            log.error("Failed to send admin notification email for order {}: {}",
                    savedOrder.getOrderCode(), emailError.getMessage());
        }

        return orderResponse;
    }

    public OrderResponse getOrderById(Long id, String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        Order order = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        if (!order.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized access to order");
        }

        return mapToOrderResponse(order);
    }

    public OrderResponse getOrderByCode(String orderCode, String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        Order order = repository.findByOrderCode(orderCode)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        if (!order.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized access to order");
        }

        return mapToOrderResponse(order);
    }

    private String generateOrderCode() {
        String dateStr = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        String prefix = "ORD-" + dateStr + "-";
        List<Order> todayOrders = repository.findAll().stream()
                .filter(o -> o.getOrderCode() != null && o.getOrderCode().startsWith(prefix))
                .collect(Collectors.toList());

        int nextNumber = todayOrders.size() + 1;
        return String.format("%s%04d", prefix, nextNumber);
    }

    public OrderResponse mapToOrderResponse(Order order) {
        List<OrderResponse.OrderItemResponse> itemResponses = order.getItems().stream()
                .map(item -> OrderResponse.OrderItemResponse.builder()
                        .id(item.getId())
                        .productName(item.getProduct().getName())
                        .quantity(item.getQuantity())
                        .price(item.getPrice())
                        .subtotal(item.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
                        .build())
                .collect(Collectors.toList());

        return OrderResponse.builder()
                .id(order.getId())
                .orderCode(order.getOrderCode())
                .total(order.getTotal())
                .status(order.getStatus())
                .createdAt(order.getCreatedAt())
                .deliveryName(order.getDeliveryName())
                .deliveryEmail(order.getDeliveryEmail())
                .deliveryPhone(order.getDeliveryPhone())
                .deliveryAddress(order.getDeliveryAddress())
                .deliveryCity(order.getDeliveryCity())
                .deliveryCounty(order.getDeliveryCounty())
                .deliveryPostalCode(order.getDeliveryPostalCode())
                .deliveryCountry(order.getDeliveryCountry())
                .deliveryNotes(order.getDeliveryNotes())
                .items(itemResponses)
                .build();
    }
}
