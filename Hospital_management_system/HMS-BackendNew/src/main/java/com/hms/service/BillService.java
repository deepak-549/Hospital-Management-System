package com.hms.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.model.Bill;
import com.hms.model.Patient;
import com.hms.repository.BillRepository;
import com.hms.repository.PatientRepository;


@Service
public class BillService {
	
	@Autowired
    private BillRepository billRepository;

    
    public Bill createBill(Bill bill) {
    	
    		bill.setTotalAmount(
    	        bill.getConsultationFee()
    	      + bill.getMedicineAmount()
    	      + bill.getBedCharges()
    	    );			
        calculateTotalAmount(bill);
        return billRepository.save(bill);
    }

   
    public Bill getBillById(Long id) {
        return billRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Bill not found"));
    }

    
    public List<Bill> getAllBills() {
        return billRepository.findAll();
    }

    
    public List<Bill> getBillsByPatient(Long patientId) {
        return billRepository.findByPatientId(patientId);
    }

    
    public List<Bill> getBillsByDoctor(Long doctorId) {
        return billRepository.findByDoctorId(doctorId);
    }

   
    public Bill updatePaymentStatus(Long id, String status, String mode) {
        Bill bill = getBillById(id);
        bill.setPaymentStatus(status);
        bill.setPaymentMode(mode);
        return billRepository.save(bill);
    }

    private void calculateTotalAmount(Bill bill) {
        double total = 0;

        if (bill.getConsultationFee() != null)
            total += bill.getConsultationFee();

        if (bill.getMedicineAmount() != null)
            total += bill.getMedicineAmount();

        if (bill.getBedCharges() != null)
            total += bill.getBedCharges();

        bill.setTotalAmount(total);
    }
    
    public Bill updateBill(Long id, Bill updatedBill) {

        Bill existingBill = billRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Bill not found"));

        existingBill.setPatientId(updatedBill.getPatientId());
        existingBill.setDoctorId(updatedBill.getDoctorId());
        existingBill.setPrescriptionId(updatedBill.getPrescriptionId());
        existingBill.setBedId(updatedBill.getBedId());

        existingBill.setConsultationFee(updatedBill.getConsultationFee());
        existingBill.setMedicineAmount(updatedBill.getMedicineAmount());
        existingBill.setBedCharges(updatedBill.getBedCharges());

        calculateTotalAmount(existingBill);
        
        return billRepository.save(existingBill);
    }
    
	 public void deleteBill(Long id) {
	        billRepository.deleteById(id);
	    }

}
