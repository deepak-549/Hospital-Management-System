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

import com.hms.model.Room;
import com.hms.service.RoomService;

@RestController
@RequestMapping("/api/rooms")
@CrossOrigin(origins = "http://localhost:3000")
public class RoomController {
	
	@Autowired
	private RoomService roomService;
	
	 @PostMapping("/add")
	 public ResponseEntity<Room> addRoom(@RequestBody Room room) {
	        Room savedRoom = roomService.addRoom(room);
	        return ResponseEntity.ok(savedRoom);
	    }

	    
	 @GetMapping
	    public ResponseEntity<List<Room>> getAllRooms() {
	        return ResponseEntity.ok(roomService.getAllRooms());
	    }   

	 @GetMapping("/{id}")
	    public ResponseEntity<Room> getRoomById(@PathVariable("id") Long id) {

	        return ResponseEntity.ok(roomService.getRoomById(id));
	    }  

	 @PutMapping("/{id}")
	    public ResponseEntity<Room> updateRoom(@PathVariable("id") Long id, @RequestBody Room room) {

	        return ResponseEntity.ok(
	                roomService.updateRoom(room, id));
	    }

	    @DeleteMapping("/{id}")
	    public ResponseEntity<String> deleteRoom(@PathVariable("id") Long id) {

	        roomService.deleteRoom(id);
	        return ResponseEntity.ok("Room deleted successfully");
	    }

}
