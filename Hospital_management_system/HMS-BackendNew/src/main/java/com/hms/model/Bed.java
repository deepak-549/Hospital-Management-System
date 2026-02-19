package com.hms.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;

@Entity
@Table(name = "beds")
public class Bed {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String bedNumber; 
    
    @OneToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;

    private boolean available = true; // true = free, false = occupied

	@JsonIgnoreProperties("beds")
    @ManyToOne
    @JoinColumn(name = "room_id", nullable = false)
    private Room room;

    
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getBedNumber() { return bedNumber; }
    public void setBedNumber(String bedNumber) {
        this.bedNumber = bedNumber;
    }

    public boolean isAvailable() { return available; }
    public void setAvailable(boolean available) {
        this.available = available;
    }


    public Patient getPatient() {
		return patient;
	}
	public void setPatient(Patient patient) {
		this.patient = patient;
	}
    
    public Room getRoom() { return room; }
    public void setRoom(Room room) { this.room = room; }
}