package com.hms.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.hms.model.Payment;
import com.hms.service.PaymentService;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "http://localhost:3000")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    /**
     * Make payment for a specific bill
     */
    @PostMapping("/{billId}")
    public ResponseEntity<String> makePayment(
            @PathVariable Long billId,
            @RequestBody Payment payment) {

        paymentService.makePayment(billId, payment);

        return ResponseEntity.ok("Payment successful. Patient discharged.");
    }
}
