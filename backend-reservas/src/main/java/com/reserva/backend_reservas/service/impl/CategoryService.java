package com.reserva.backend_reservas.service.impl;

import com.reserva.backend_reservas.Repository.ICategoryRepository;
import com.reserva.backend_reservas.dto.CategoryDto;
import com.reserva.backend_reservas.entity.Category;
import com.reserva.backend_reservas.exception.ResourceNotFoundException;
import com.reserva.backend_reservas.service.IcategoryService;
import jakarta.validation.constraints.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CategoryService implements IcategoryService {
    @Autowired
    ICategoryRepository categoryRepository;
    @Override
    public List<CategoryDto> getAll() {
        List<Category> categories = categoryRepository.findAll();

        List<CategoryDto> dto = new ArrayList<>();
        for (Category category : categories){
            dto.add(new CategoryDto(category.getId(),category.getName(),category.getImageUrl()));
        }
        return dto;
    }

    @Override
    public Category createCategory(Category category) {
        if (categoryRepository.existsByNameIgnoreCase(category.getName())){
            throw new  IllegalArgumentException("categoria  ya existe intenta con otra");
        }
        return categoryRepository.save(category);
    }

    @Override
    public Optional<CategoryDto> findById(Long id) throws ResourceNotFoundException{
        Optional<Category> category = categoryRepository.findById(id);
        Optional<CategoryDto> categoryDto = null;
        if (category.isPresent()){
            Category ca =  category.get();
            CategoryDto dto = new CategoryDto();
            dto.setId(ca.getId());
            dto.setName(ca.getName());
            categoryDto = Optional.of(dto);
            return categoryDto;
        }else {
            throw new ResourceNotFoundException("no se encontro la categoria");
        }
    }
}
