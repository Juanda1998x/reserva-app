package com.reserva.backend_reservas.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.reserva.backend_reservas.dto.ProductDto;
import com.reserva.backend_reservas.entity.Imagen;
import com.reserva.backend_reservas.entity.Product;
import com.reserva.backend_reservas.exception.ResourceNotFoundException;
import com.reserva.backend_reservas.service.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/product")
public class ProductController {
    @Autowired
    IProductService productService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> save(
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestPart("images") List<MultipartFile> images){
        try {

            Product product = new Product();
            product.setName(name);
            product.setDescription(description);

            List<Imagen> imagenes = new ArrayList<>();

            for (MultipartFile file: images){

                if (file.isEmpty()){
                    return ResponseEntity.badRequest().body("imagen vacia");
                }
                Imagen imagen = new Imagen();
                imagen.setNombre(file.getOriginalFilename());
                imagen.setTipo(file.getContentType());
                imagen.setDatos(file.getBytes());
                imagen.setProduct(product);
                imagenes.add(imagen);
            }
            product.setImagenes(imagenes);
            Product savedProduct = productService.saveProduct(product);
            ProductDto dto = new ProductDto();
            dto.setId(savedProduct.getId());
            dto.setName(savedProduct.getName());
            dto.setDescription(savedProduct.getDescription());

            List<String> imagenesBase64 = savedProduct.getImagenes().stream().map(imagen->{
                String base64 = Base64.getEncoder().encodeToString(imagen.getDatos());
                return "data:" + imagen.getTipo() + "base64," + base64;
            })
                    .collect(Collectors.toList());
            dto.setImages(imagenesBase64);
            return ResponseEntity.ok(dto);

        }catch (IOException e){

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("error al procesar imagen" + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<ProductDto>> getRandomProducts(){
        List<ProductDto> randomProduts = productService.getRandomProduct();
        return ResponseEntity.ok(randomProduts);
    }

    @GetMapping("/paginated")
    public ResponseEntity<Page<ProductDto>> getPaginatedProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ){
        Page<ProductDto> pageResult = productService.getProductsPaginated(page, size);
        return ResponseEntity.ok(pageResult);
    }
    @GetMapping("/all")
    public ResponseEntity<List<ProductDto>>getAll(){
        List<ProductDto> result = productService.getAll();
        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) throws ResourceNotFoundException {
        productService.delete(id);
        return ResponseEntity.ok("Se eliminó el producto con id: " + id);
    }

}
