package com.reserva.backend_reservas.service.impl;

import com.reserva.backend_reservas.Repository.ICategoryRepository;
import com.reserva.backend_reservas.Repository.IProductRepository;
import com.reserva.backend_reservas.dto.CategoryDto;
import com.reserva.backend_reservas.dto.ProductDto;
import com.reserva.backend_reservas.entity.Category;
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

    @Autowired
    ICategoryRepository categoryRepository;

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
            dto.setCategory(product.getCategory());

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
        Optional<ProductDto> dto = findById(id);
        if (dto.isPresent()) {
            productRepository.deleteById(id);
        } else {
            throw new ResourceNotFoundException("No se puedo eliminar el producto con id: " + id);
        }
    }

    @Override
    public Optional<ProductDto> findById(Long id) throws ResourceNotFoundException{

    Optional<Product> product = productRepository.findById(id);
    Optional<ProductDto> dto = null;
    if(product.isPresent()){

        Product p = product.get();
        ProductDto respuestaDto = new ProductDto();
        respuestaDto.setName(p.getName());
        respuestaDto.setDescription(p.getDescription());
        respuestaDto.setId(p.getId());
        respuestaDto.setCategory(p.getCategory());
        respuestaDto.setCharacteristics(p.getCharacteristics());
        List<String> imagenesBase64 = p.getImagenes().stream().map(imagen -> {
            String base64 = Base64.getEncoder().encodeToString(imagen.getDatos());
            return "data:" + imagen.getTipo() + ";base64," + base64;
        }).collect(Collectors.toList());

        respuestaDto.setImages(imagenesBase64);

        dto = Optional.of(respuestaDto);
        return dto;
    }else {
        throw new ResourceNotFoundException("no se encontro el producto");
    }

    }

    @Override
    public List<ProductDto> getAll() {

        return productRepository.findAll().stream().map(product -> {
            ProductDto dto = new ProductDto();
            dto.setId(product.getId());
            dto.setName(product.getName());
            dto.setDescription(product.getDescription());
            dto.setCategory(product.getCategory());
            dto.setCharacteristics(product.getCharacteristics());

            List<String> imagenesBase64 = product.getImagenes().stream().map(imagen -> {
                String base64 = Base64.getEncoder().encodeToString(imagen.getDatos());
                return "data:" + imagen.getTipo() + ";base64," + base64;
            }).collect(Collectors.toList());
            dto.setImages(imagenesBase64);
            return dto;
        }).collect(Collectors.toList());
    }

    @Override
    public ProductDto updateCategory(Long productId, Long categoryId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(()-> new RuntimeException("producto no encontrado"));
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(()-> new RuntimeException("categoria no encontrada"));

        product.setCategory(category);
        Product update = productRepository.save(product);

        ProductDto dto = new ProductDto();
        dto.setId(update.getId());
        dto.setName(update.getName());
        dto.setDescription(update.getDescription());

        List<String> imagenesBase64 = product.getImagenes().stream().map(imagen -> {
            String base64 = Base64.getEncoder().encodeToString(imagen.getDatos());
            return "data:" + imagen.getTipo() + ";base64," + base64;
        }).collect(Collectors.toList());
        dto.setImages(imagenesBase64);

        return dto;

    }

    @Override
    public List<Product> findByCategoryId(Long categoryId) {
        return productRepository.findByCategoryId(categoryId);
    }
}
