package com.hms.model;
	

import jakarta.annotation.Nullable;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Entity
@Table(name = "patients")
public class Patient {

	 @Id
	 @GeneratedValue(strategy = GenerationType.IDENTITY)
	 private Long id;

	 @Column
	 private String name;
	 @Column
	 private String age;
	 @Column
	 private String gender;
	 @Column
	 private String phone;
	 @Column
	 private String disease;
	 @Column
	 private String address;
	 @Column
	 private String bloodGroup;
	 
	 @Nullable
	 @ManyToOne
	 @JoinColumn(name="doctorId")
	 private Doctor doctor;
	 
	 @Column
	 private String status;
	 
	 public String getStatus() {
		return status;
	}
	 public void setStatus(String status) {
		 this.status = status;
	 }
	 public Doctor getDoctor() {
		return doctor;
	}
	 public void setDoctor(Doctor doctor) {
		 this.doctor = doctor;
	 }
	 public String getName() {
		 return name;
	 }
	 public void setName(String name) {
		 this.name = name;
	 }
	 public String getAge() {
		 return age;
	 }
	 public void setAge(String age) {
		 this.age = age;
	 }
	 public String getGender() {
		 return gender;
	 }
	 public Long getId() {
		return id;
	}
	 public void setId(Long id) {
		 this.id = id;
	 }
	 public void setGender(String gender) {
		 this.gender = gender;
	 }
	 public String getPhone() {
		 return phone;
	 }
	 public void setPhone(String phone) {
		 this.phone = phone;
	 }
	 public String getDisease() {
		 return disease;
	 }
	 public void setDisease(String disease) {
		 this.disease = disease;
	 }
	 public String getAddress() {
		 return address;
	 }
	 public void setAddress(String address) {
		 this.address = address;
	 }
	 public String getBloodGroup() {
		 return bloodGroup;
	 }
	 public void setBloodGroup(String bloodGroup) {
		 this.bloodGroup = bloodGroup;
	 }
	 
	 
	 
	
}
