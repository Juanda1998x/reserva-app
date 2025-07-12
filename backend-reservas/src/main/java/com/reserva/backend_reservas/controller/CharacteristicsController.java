package com.reserva.backend_reservas.controller;

import com.reserva.backend_reservas.Repository.ICharacteristicsRepository;
import com.reserva.backend_reservas.entity.Characteristics;
import com.reserva.backend_reservas.exception.ResourceNotFoundException;
import com.reserva.backend_reservas.service.impl.CharacteristicsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/characteristics")
public class CharacteristicsController {

    private final CharacteristicsService characteristicsService;
    private final ICharacteristicsRepository characteristicsRepository;

    @GetMapping("/all")
    public ResponseEntity<List<Characteristics>> getAll() {
        return ResponseEntity.ok(characteristicsService.getAll());
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) throws ResourceNotFoundException {
        characteristicsService.delete(id);
        return ResponseEntity.ok().build();

    }

    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody Characteristics characteristics) throws IllegalArgumentException{
        try {
            return ResponseEntity.ok(characteristicsService.create(characteristics));
        }catch(IllegalArgumentException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable Long id,
                                    @RequestBody Characteristics characteristics) throws ResourceNotFoundException {
        return ResponseEntity.ok(characteristicsService.edit(id, characteristics));

    }

}
