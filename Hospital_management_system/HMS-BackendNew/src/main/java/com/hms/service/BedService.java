package com.hms.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.model.Bed;
import com.hms.model.Patient;
import com.hms.model.Room;
import com.hms.repository.BedRepository;
import com.hms.repository.PatientRepository;
import com.hms.repository.RoomRepository;

@Service
public class BedService {

	@Autowired
    private BedRepository bedRepository;
	
	@Autowired 
	private RoomRepository roomRepository;
	
	@Autowired
	private PatientRepository patientRepository;
	
    public Bed addBed(Bed bed) {
    	
    		System.out.println(getBedCountByRoom(bed.getRoom().getId()));
    		if(getBedCountByRoom(bed.getRoom().getId())>10) {
    			throw new RuntimeException("Current Room is Full ");
    			
    		}
    	
    		Long r_id = bed.getRoom().getId();
    		
    		Room room = roomRepository.getById(r_id);
    		
    		bed.setRoom(room);
    		
        return bedRepository.save(bed);
    }
    
    public Bed assignPatient(Bed bed) {
    	
    	if(getBedCountByRoom(bed.getRoom().getId())>10) {
			throw new RuntimeException("Current Room is Full ");
			
		}
		
		
	
		Long r_id = bed.getRoom().getId();
		
		Room room = roomRepository.getById(r_id);
		
		bed.setRoom(room);
		
    return bedRepository.save(bed);
    }

    public List<Bed> getAllBeds() {
        return bedRepository.findAll();
    }

    public Bed getBedById(Long id) {
        return bedRepository.findById(id).orElseThrow(() ->
                    new RuntimeException("Bed not found"));
    }

    public Bed updateBed(Long id, Bed bed) {
        Bed existing = getBedById(id);
        
        existing.setBedNumber(bed.getBedNumber());
//        existing.setAvailable(bed.isAvailable());
        
        return bedRepository.save(existing);
    }

    public void deleteBed(Long id) {
        bedRepository.deleteById(id);
    }
    
    public long getBedCountByRoom(Long roomId) {
        return bedRepository.countByRoomId(roomId);
    }
    
    public Bed assignBed(Bed bed) {
		
		Long p_id = bed.getPatient().getId();
		
		Patient patient = patientRepository.findById(p_id).orElseThrow(() ->
        						new RuntimeException("Patient not found"));
    	
		Bed existing = getBedById(bed.getId());
			existing.setAvailable(false);
	    		existing.setPatient(patient);
	    		
	    return bedRepository.save(existing);
	    		
    }
    
}
