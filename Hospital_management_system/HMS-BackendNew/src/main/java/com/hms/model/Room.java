package com.hms.model;

import jakarta.persistence.*;

@Entity
@Table(name = "rooms")
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String roomNumber;

    @Column(nullable = false)
    private String roomType; // GENERAL, ICU, PRIVATE

//    @Column(nullable = false)
//    private double chargesPerDay;
//
//  
    public Long getId() { 
    		return id; 
    	}
    
    public void setId(Long id) { this.id = id; }

    public String getRoomNumber() { 
    		return roomNumber; 
    }
    
    public void setRoomNumber(String roomNumber) {
        this.roomNumber = roomNumber;
    }

    public String getRoomType() { 
    		return roomType; 
    }
    
    public void setRoomType(String roomType) {
        this.roomType = roomType;
    }

//    public double getChargesPerDay() {  
//    	
//    		return chargesPerDay;
//    }
//    
//    
//    public void setChargesPerDay(double chargesPerDay) {
//        this.chargesPerDay = chargesPerDay;
//    }

}