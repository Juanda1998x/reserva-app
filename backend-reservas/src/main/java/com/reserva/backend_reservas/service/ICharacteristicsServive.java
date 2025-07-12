package com.reserva.backend_reservas.service;

import com.reserva.backend_reservas.entity.Characteristics;
import com.reserva.backend_reservas.exception.ResourceNotFoundException;

import java.util.List;
import java.util.Optional;

public interface ICharacteristicsServive {
    List<Characteristics> getAll();
    void delete(Long id) throws ResourceNotFoundException;
    Optional<Characteristics> findById(Long id) throws ResourceNotFoundException;
    Characteristics create(Characteristics characteristics);

    boolean existByName(String name);

    Characteristics edit(Long id, Characteristics characteristics) throws ResourceNotFoundException;
}
