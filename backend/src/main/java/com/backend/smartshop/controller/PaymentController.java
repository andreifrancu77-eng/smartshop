package com.backend.smartshop.controller;

import com.backend.smartshop.dto.PaymentIntentRequest;
import com.backend.smartshop.dto.PaymentIntentResponse;
import com.backend.smartshop.service.StripeService;
import com.stripe.exception.StripeException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final StripeService stripeService;

    @PostMapping("/create-payment-intent")
    public ResponseEntity<?> createPaymentIntent(
            @RequestBody PaymentIntentRequest request) {
        try {
            PaymentIntentResponse response = stripeService.createPaymentIntent(request);
            return ResponseEntity.ok(response);
        } catch (StripeException e) {
            return ResponseEntity.badRequest()
                    .body(java.util.Map.of("message", "Eroare Stripe: " + e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(java.util.Map.of("message", "Eroare: " + e.getMessage()));
        }
    }

    @PostMapping("/webhook")
    public ResponseEntity<String> handleStripeWebhook(
            @RequestBody String payload,
            @RequestHeader("Stripe-Signature") String sigHeader) {
        return ResponseEntity.ok("Received");
    }

    @PostMapping("/success")
    public ResponseEntity<Void> handlePaymentSuccess(@RequestParam String paymentIntentId) {
        stripeService.handlePaymentSuccess(paymentIntentId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/failure")
    public ResponseEntity<Void> handlePaymentFailure(@RequestParam String paymentIntentId) {
        stripeService.handlePaymentFailure(paymentIntentId);
        return ResponseEntity.ok().build();
    }
}
