package com.reserva.backend_reservas.service;

import com.reserva.backend_reservas.dto.ProductDto;
import com.reserva.backend_reservas.entity.Product;
import com.reserva.backend_reservas.exception.ResourceNotFoundException;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

public interface IProductService {
    Product saveProduct(Product product);

    List<ProductDto> getRandomProduct();

    Page<ProductDto> getProductsPaginated(int page, int size);

    void delete(long id) throws ResourceNotFoundException;

    Optional<ProductDto> findById(Long id) throws ResourceNotFoundException;

    List<ProductDto> getAll();

    ProductDto updateCategory(Long productId, Long categoryId);

    List<Product> findByCategoryId(Long categoryId);


}