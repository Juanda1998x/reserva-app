package com.reserva.backend_reservas.service.impl;

import com.reserva.backend_reservas.Repository.ICharacteristicsRepository;
import com.reserva.backend_reservas.entity.Characteristics;
import com.reserva.backend_reservas.exception.ResourceNotFoundException;
import com.reserva.backend_reservas.service.ICharacteristicsServive;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CharacteristicsService implements ICharacteristicsServive {

    private final ICharacteristicsRepository characteristicsRepository;

    @Override
    public List<Characteristics> getAll() {
        return characteristicsRepository.findAll();
    }

    @Override
    public void delete(Long id) throws ResourceNotFoundException {
        Optional<Characteristics> response = characteristicsRepository.findById(id);
        if (response.isPresent()) {
            characteristicsRepository.deleteById(id);
        }else {
            throw new ResourceNotFoundException("no fue posible eliminar intenta nuevamente");
        }
    }

    @Override
    public Optional<Characteristics> findById(Long id) throws ResourceNotFoundException {
        Optional<Characteristics> response = characteristicsRepository.findById(id);
        if (response.isPresent()) {
            return response;
        }else {
            throw new ResourceNotFoundException("no se encontro la caracteristica");
        }
    }

    @Override
    public Characteristics create(Characteristics characteristics) {
        if (characteristicsRepository.existsByNameIgnoreCase(characteristics.getName())){
           throw new  IllegalArgumentException("caracteristica ya existe");
        }
        return characteristicsRepository.save(characteristics);
    }
    @Override
    public boolean existByName(String name){
        return characteristicsRepository.existsByNameIgnoreCase(name);
    }
    @Override
    public Characteristics edit(Long id, Characteristics characteristics) throws ResourceNotFoundException {
        if (characteristicsRepository.existsByNameIgnoreCase(characteristics.getName())){
            throw new IllegalArgumentException("ya existe esta caracteristica ");
        }
        Optional<Characteristics> response = characteristicsRepository.findById(id);
        if (response.isPresent()){
            Characteristics newDates = response.get();
            newDates.setName(characteristics.getName());
            newDates.setIcon(characteristics.getIcon());

            return   characteristicsRepository.save(newDates);
        }else {
            throw new ResourceNotFoundException("no fue posible actualizar ");
        }

    }
}
