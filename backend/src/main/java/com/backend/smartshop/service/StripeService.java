package com.backend.smartshop.service;

import com.backend.smartshop.domain.Order;
import com.backend.smartshop.domain.OrderStatus;
import com.backend.smartshop.dto.OrderResponse;
import com.backend.smartshop.dto.PaymentIntentRequest;
import com.backend.smartshop.dto.PaymentIntentResponse;
import com.backend.smartshop.repository.OrderRepository;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
@Slf4j
public class StripeService {

    private final OrderRepository orderRepository;
    private final OrderService orderService;
    private final EmailService emailService;

    public PaymentIntentResponse createPaymentIntent(PaymentIntentRequest request) throws StripeException {
        long amountInCents = request.getAmount().multiply(new BigDecimal("100")).longValue();

        PaymentIntentCreateParams.Builder paramsBuilder = PaymentIntentCreateParams.builder()
                .setAmount(amountInCents)
                .setCurrency(request.getCurrency() != null ? request.getCurrency() : "ron")
                .setAutomaticPaymentMethods(
                        PaymentIntentCreateParams.AutomaticPaymentMethods.builder()
                                .setEnabled(true)
                                .build()
                );

        if (request.getOrderId() != null) {
            paramsBuilder.putMetadata("orderId", request.getOrderId().toString());
        }

        PaymentIntent paymentIntent = PaymentIntent.create(paramsBuilder.build());

        log.info("Created payment intent: {} for amount: {} {}",
                paymentIntent.getId(), request.getAmount(), request.getCurrency());

        return PaymentIntentResponse.builder()
                .clientSecret(paymentIntent.getClientSecret())
                .paymentIntentId(paymentIntent.getId())
                .build();
    }

    public void handlePaymentSuccess(String paymentIntentId) {
        try {
            PaymentIntent paymentIntent = PaymentIntent.retrieve(paymentIntentId);
            String orderIdStr = paymentIntent.getMetadata().get("orderId");

            if (orderIdStr != null) {
                Long orderId = Long.parseLong(orderIdStr);
                Order order = orderRepository.findById(orderId)
                        .orElseThrow(() -> new RuntimeException("Order not found"));

                order.setStatus(OrderStatus.PROCESSING);
                orderRepository.save(order);

                log.info("Order {} marked as PROCESSING after successful payment", orderId);

                try {
                    OrderResponse orderResponse = orderService.getOrderById(orderId, order.getUser().getEmail());
                    emailService.sendOrderConfirmationEmail(orderResponse);
                } catch (Exception emailError) {
                    log.error("Failed to send confirmation email for order {}: {}",
                            orderId, emailError.getMessage());
                }
            }
        } catch (Exception e) {
            log.error("Error handling payment success: {}", e.getMessage());
        }
    }

    public void handlePaymentFailure(String paymentIntentId) {
        try {
            PaymentIntent paymentIntent = PaymentIntent.retrieve(paymentIntentId);
            String orderIdStr = paymentIntent.getMetadata().get("orderId");

            if (orderIdStr != null) {
                Long orderId = Long.parseLong(orderIdStr);
                Order order = orderRepository.findById(orderId)
                        .orElseThrow(() -> new RuntimeException("Order not found"));

                order.setStatus(OrderStatus.CANCELLED);
                orderRepository.save(order);

                log.info("Order {} marked as CANCELLED after payment failure", orderId);
            }
        } catch (Exception e) {
            log.error("Error handling payment failure: {}", e.getMessage());
        }
    }
}
