package com.hms.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.model.Bed;
import com.hms.model.Room;
import com.hms.repository.BedRepository;
import com.hms.repository.RoomRepository;

@Service
public class RoomService {
	
	@Autowired 
	private RoomRepository roomRepository;

	public Room addRoom(Room room) {
		
		return roomRepository.save(room);
	}
	
	public List<Room> getAllRooms(){
		return roomRepository.findAll();
	}
	
	public Room getRoomById(Long id) {
		return roomRepository.findById(id).orElseThrow(()-> new RuntimeException("Room Not Found!!"));
	}
	
	public Room updateRoom(Room room , Long id ) {
		Room existing = getRoomById(id);
		
		
//		existing.setChargesPerDay(room.getChargesPerDay());
		existing.setRoomNumber(room.getRoomNumber());
		existing.setRoomType(room.getRoomType());
		
		return roomRepository.save(existing);
	}
	
	public void deleteRoom(Long id) {
		roomRepository.deleteById(id);
	}
	
}
