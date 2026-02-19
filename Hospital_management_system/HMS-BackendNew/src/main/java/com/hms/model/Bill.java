package com.hms.model;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
@Table(name = "bills")
public class Bill {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long patientId;

    @Column(nullable = false)
    private Long doctorId;

    @Column
    private Long prescriptionId;

    @Column
    private Long bedId;

    @Column(nullable = false)
    private Double consultationFee;

    @Column
    private Double medicineAmount;

    @Column
    private Double bedCharges;

    @Column(nullable = false)
    private Double totalAmount;
    
    @Column(nullable = false)
    private String paymentStatus;   

    @Column
    private String paymentMode;     

    @Column(nullable = false)
    private LocalDateTime billDate;

    public Bill() {
        this.billDate = LocalDateTime.now();
        this.paymentStatus = "UNPAID";
    }

 
    public Long getId() {
        return id;
    }

    public Long getPatientId() {
        return patientId;
    }

    public void setPatientId(Long patientId) {
        this.patientId = patientId;
    }

    public Long getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(Long doctorId) {
        this.doctorId = doctorId;
    }

    public Long getPrescriptionId() {
        return prescriptionId;
    }

    public void setPrescriptionId(Long prescriptionId) {
        this.prescriptionId = prescriptionId;
    }

    public Long getBedId() {
        return bedId;
    }

    public void setBedId(Long bedId) {
        this.bedId = bedId;
    }

    public Double getConsultationFee() {
        return consultationFee;
    }

    public void setConsultationFee(Double consultationFee) {
        this.consultationFee = consultationFee;
    }

    public Double getMedicineAmount() {
        return medicineAmount;
    }

    public void setMedicineAmount(Double medicineAmount) {
        this.medicineAmount = medicineAmount;
    }

    public Double getBedCharges() {
        return bedCharges;
    }

    public void setBedCharges(Double bedCharges) {
        this.bedCharges = bedCharges;
    }

    public Double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(Double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public String getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(String paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public String getPaymentMode() {
        return paymentMode;
    }

    public void setPaymentMode(String paymentMode) {
        this.paymentMode = paymentMode;
    }

    public LocalDateTime getBillDate() {
        return billDate;
    }
}