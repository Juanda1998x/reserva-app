package com.reserva.backend_reservas.service.impl;

import com.reserva.backend_reservas.Repository.IProductRepository;
import com.reserva.backend_reservas.dto.ProductDto;
import com.reserva.backend_reservas.entity.Product;
import com.reserva.backend_reservas.exception.ResourceNotFoundException;
import com.reserva.backend_reservas.service.IProductService;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;

import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.*;

@Service
public class ProductService implements IProductService{

    @Autowired  /*inyecta dependencias automaticamente*/
    IProductRepository productRepository;

    @Override /* sobreescribir metodos*/
    public Product saveProduct(Product product) {

        /* aca verificamos que no exista el nombre para crear el producto*/
        if (productRepository.existsByNameIgnoreCase(product.getName())){
            throw new  IllegalArgumentException("nombre en uso intenta con otro");
        }
        return productRepository.save(product);
    }

    @Override
    public List<ProductDto> getRandomProduct() {
        List<Product> products =  productRepository.getRandomProducts();
        return products.stream().map(product -> {
            ProductDto dto = new ProductDto();
            dto.setId(product.getId());
            dto.setName(product.getName());
            dto.setDescription(product.getDescription());

            List<String> imagenesBase64 = product.getImagenes().stream().map(imagen->{
                        String base64 = Base64.getEncoder().encodeToString(imagen.getDatos());
                        return "data:" + imagen.getTipo() + ";base64," + base64;
                    })
                    .collect(Collectors.toList());
            dto.setImages(imagenesBase64);
            return dto;
        }).collect(Collectors.toList());
    }

    @Override
    public Page<ProductDto> getProductsPaginated(int page, int size) {
        Pageable pageable = PageRequest.of(page,size);
        Page<Product> productsPage = productRepository.findAll(pageable);

      return productsPage.map( product ->{
          ProductDto dto = new ProductDto();
          dto.setId(product.getId());
          dto.setName(product.getName());
          dto.setDescription(product.getDescription());

          List<String> imagenesBase64 = product.getImagenes().stream().map(imagen->{
                      String base64 = Base64.getEncoder().encodeToString(imagen.getDatos());
                      return "data:" + imagen.getTipo() + ";base64," + base64;
                  }).collect(Collectors.toList());
          dto.setImages(imagenesBase64);
          return dto;
      });

    }

    @Override
    public void delete(long id) throws ResourceNotFoundException{
        Optional<Product> patientToLookFor = findById(id);
        if (patientToLookFor.isPresent()) {
            productRepository.deleteById(id);
        } else {
            throw new ResourceNotFoundException("No se puedo eliminar el producto con id: " + id);
        }
    }

    @Override
    public Optional<Product> findById(Long id) {
        return productRepository.findById(id);
    }

    @Override
    public List<ProductDto> getAll() {

        return productRepository.findAll().stream().map(product -> {
            ProductDto dto = new ProductDto();
            dto.setId(product.getId());
            dto.setName(product.getName());
            dto.setDescription(product.getDescription());

            List<String> imagenesBase64 = product.getImagenes().stream().map(imagen -> {
                String base64 = Base64.getEncoder().encodeToString(imagen.getDatos());
                return "data:" + imagen.getTipo() + ";base64," + base64;
            }).collect(Collectors.toList());
            dto.setImages(imagenesBase64);
            return dto;
        }).collect(Collectors.toList());
    }


}
