package com.hms.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hms.model.Bed;
import com.hms.service.BedService;

@RestController
@RequestMapping("/api/beds")
@CrossOrigin(origins = "http://localhost:3000")
public class BedController {

    @Autowired
    private BedService bedService;

    @PostMapping("/add")
    public ResponseEntity<Bed> addBed(@RequestBody Bed bed) {
        return ResponseEntity.ok(bedService.addBed(bed));
    }

    @GetMapping
    public ResponseEntity<List<Bed>> getAllBeds() {
        return ResponseEntity.ok(bedService.getAllBeds());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Bed> getBed(
            @PathVariable("id") Long id) {

        return ResponseEntity.ok(bedService.getBedById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Bed> updateBed(
            @PathVariable("id") Long id,
            @RequestBody Bed bed) {

        return ResponseEntity.ok(bedService.updateBed(id, bed));
    }
    
    @PutMapping("/assign")
    public ResponseEntity<Bed> assignBed(@RequestBody Bed bed) {

        return ResponseEntity.ok(bedService.assignBed(bed));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBed(
            @PathVariable("id") Long id) {

        bedService.deleteBed(id);
        return ResponseEntity.ok("Bed deleted successfully");
    }
}
