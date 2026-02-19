package com.hms.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.model.Appointment;
import com.hms.model.Bed;
import com.hms.model.Bill;
import com.hms.model.Patient;
import com.hms.model.Payment;
import com.hms.repository.AppointmentRepository;
import com.hms.repository.BedRepository;
import com.hms.repository.BillRepository;
import com.hms.repository.PatientRepository;
import com.hms.repository.PaymentRepository;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private BillRepository billRepository;

    @Autowired
    private PatientRepository patientRepository;
    
    @Autowired
    private AppointmentRepository appointmentRepository;
    
    @Autowired 
    private BedRepository bedRepository;

    /**
     * Make payment for a bill and discharge patient
     */
    @Transactional
    public void makePayment(Long billId, Payment payment) {

        Bill bill = billRepository.findById(billId)
                .orElseThrow(() -> new RuntimeException("Bill not found"));

        // ✅ Set mandatory payment details
        payment.setBill(bill);
        payment.setAmount(bill.getTotalAmount());
        payment.setPaymentDate(LocalDateTime.now());

        // ✅ Validate UPI
        if ("UPI".equalsIgnoreCase(payment.getPaymentMode())) {
            if (payment.getUpiId() == null || payment.getUpiId().isEmpty()) {
                throw new RuntimeException("UPI ID is required for UPI payment");
            }
        } else {
            payment.setUpiId(null); // CASH payment
        }

        // ✅ Mark bill as paid
//        bill.setPaid(true);

        // ✅ Save payment & bill
        paymentRepository.save(payment);
        billRepository.save(bill);
        
        Patient patient = patientRepository.getById(bill.getPatientId());

        patient.setStatus("DISCHARGED");
        patientRepository.save(patient);
        
//        Bed bed = bedRepository.getById(bill.getBedId());
//        if (bed != null) {
//            bed.setAvailable(true);
//            bedRepository.save(bed);
//        }
//        
        Appointment appointments =
                appointmentRepository.getByPatient(patient);

        appointments.setStatus("Completed");
        appointmentRepository.save(appointments);
    }
        
}

