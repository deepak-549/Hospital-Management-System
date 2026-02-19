package com.hms.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.hms.model.Bill;
import com.hms.model.Patient;
import com.hms.repository.PatientRepository;
import com.hms.service.BillService;

@RestController
@RequestMapping("/api/bills")
@CrossOrigin(origins = "http://localhost:3000")
public class BillController {

    @Autowired
    private BillService billService;

   
    
    @PostMapping
    public ResponseEntity<Bill> generateBill(@RequestBody Bill bill) {
        return ResponseEntity.ok(
                billService.createBill(bill));
    }

    
    @GetMapping
    public ResponseEntity<List<Bill>> getAllBills() {
        return ResponseEntity.ok(
                billService.getAllBills());
    }

  
    @GetMapping("/{id}")
    public ResponseEntity<Bill> getBill(
            @PathVariable("id") Long id) {

        return ResponseEntity.ok(
                billService.getBillById(id));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Bill> updateBill(@PathVariable("id") Long id, @RequestBody Bill bill){
    	
    		return ResponseEntity.ok(billService.updateBill(id, bill));
    		
    }
 
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBill(
            @PathVariable("id") Long id) {

        billService.deleteBill(id);
        return ResponseEntity.ok("Bill deleted successfully");
    }
}