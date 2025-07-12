package com.reserva.backend_reservas.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.reserva.backend_reservas.Repository.ICharacteristicsRepository;
import com.reserva.backend_reservas.dto.CategoryDto;
import com.reserva.backend_reservas.dto.ProductDto;
import com.reserva.backend_reservas.entity.Category;
import com.reserva.backend_reservas.entity.Characteristics;
import com.reserva.backend_reservas.entity.Imagen;
import com.reserva.backend_reservas.entity.Product;
import com.reserva.backend_reservas.exception.ResourceNotFoundException;
import com.reserva.backend_reservas.service.IProductService;
import com.reserva.backend_reservas.service.IcategoryService;
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
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/product")
public class ProductController {
    @Autowired
    IProductService productService;
    @Autowired
    IcategoryService categoryService;
    @Autowired
    ICharacteristicsRepository characteristicsRepository;

    @PostMapping(path = "/create", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> save(
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("categoryId") Long categoryId,
            @RequestPart("images") List<MultipartFile> images,
            @RequestPart("characteristics" ) String characteristicsJson) throws ResourceNotFoundException{
        try {

            ObjectMapper mapper = new ObjectMapper();
            List<Integer> intList = mapper.readValue(characteristicsJson, new TypeReference<List<Integer>>() {});
            List<Long> characteristics = intList.stream()
                    .map(Integer:: longValue)
                    .collect(Collectors.toList());
            List<Characteristics> characteristic = characteristicsRepository.findAllById(characteristics);

            Optional<CategoryDto> categoryDto = categoryService.findById(categoryId);
            Category category = new Category();
            category.setId(categoryDto.get().getId());
            category.setName(categoryDto.get().getName());


            Product product = new Product();
            product.setName(name);
            product.setDescription(description);
            product.setCategory(category);
            product.setCharacteristics(characteristic);


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
            dto.setCategory(savedProduct.getCategory());
            dto.setCharacteristics(savedProduct.getCharacteristics());

            List<String> imagenesBase64 = savedProduct.getImagenes().stream().map(imagen->{
                String base64 = Base64.getEncoder().encodeToString(imagen.getDatos());
                return "data:" + imagen.getTipo() + "base64," + base64;
            })
                    .collect(Collectors.toList());
            dto.setImages(imagenesBase64);
            dto.setCategory(savedProduct.getCategory());
            return ResponseEntity.ok(dto);

        }catch (IOException e){

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("error al procesar imagen" + e.getMessage());
        }
    }

    @GetMapping("/random")
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
    @GetMapping("/category/{categoryId}")
    public  ResponseEntity<List<Product>> findByCategoryId(@PathVariable Long categoryId){
        List<Product> product = productService.findByCategoryId(categoryId);
        return ResponseEntity.ok(product);
    }
    @GetMapping("/{id}")
    public ResponseEntity<ProductDto> findById(@PathVariable Long id) throws ResourceNotFoundException {
        Optional<ProductDto> dto = productService.findById(id);

        return dto.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) throws ResourceNotFoundException {
        productService.delete(id);
        return ResponseEntity.ok("Se eliminó el producto con id: " + id);
    }
    @PutMapping("/{id}/category")
    public ResponseEntity<ProductDto> updateCategory(
            @PathVariable Long id,
            @RequestParam Long categoryId
    ){
        ProductDto product = productService.updateCategory(id, categoryId);
        return ResponseEntity.ok(product);

    }


}
