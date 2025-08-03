package com.reserva.backend_reservas.controller;


import com.reserva.backend_reservas.dto.CategoryDto;
import com.reserva.backend_reservas.entity.Category;
import com.reserva.backend_reservas.service.IcategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/category")
public class CategoryController {

    @Autowired
    IcategoryService categoryService;

    @GetMapping("get")
    public ResponseEntity<List<CategoryDto>> getall(){

        List<CategoryDto> dto = categoryService.getAll();
        return ResponseEntity.ok(dto);

    }

    @PostMapping("/create")
    public ResponseEntity<Category> createCategory(@RequestBody Category category){

        Category response = categoryService.createCategory(category);
        return ResponseEntity.ok(response);

    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteCategory(@PathVariable Long id) {
        try {
            categoryService.deleteCategory(id);
            return ResponseEntity.ok("Categoría eliminada correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error al eliminar la categoría: " + e.getMessage());
        }
    }


}
