package com.reserva.backend_reservas.service.impl;

import com.reserva.backend_reservas.Repository.ICategoryRepository;
import com.reserva.backend_reservas.Repository.IProductRepository;
import com.reserva.backend_reservas.dto.ProductDto;
import com.reserva.backend_reservas.entity.Category;
import com.reserva.backend_reservas.entity.Product;
import com.reserva.backend_reservas.entity.Review;
import com.reserva.backend_reservas.exception.ResourceNotFoundException;
import com.reserva.backend_reservas.service.IProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.*;
import org.springframework.stereotype.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

import org.springframework.data.domain.*;

@Service
@RequiredArgsConstructor
public class ProductService implements IProductService{

    @Autowired  /*inyecta dependencias automaticamente*/
    IProductRepository productRepository;

    @Autowired
    ICategoryRepository categoryRepository;

    @Override
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
            dto.setCharacteristics(product.getCharacteristics());

            List<String> imagenesBase64 = product.getImagenes().stream().map(imagen->{
                        String base64 = Base64.getEncoder().encodeToString(imagen.getDatos());
                        return "data:" + imagen.getTipo() + ";base64," + base64;
                    })
                    .collect(Collectors.toList());
            dto.setImages(imagenesBase64);
            if (product.getReviews() != null && !product.getReviews().isEmpty()) {
                int reviewCount = product.getReviews().size();
                double averageRating = product.getReviews().stream()
                        .mapToInt(Review::getRating)
                        .average()
                        .orElse(0.0);
                dto.setReviewCount(reviewCount);
                dto.setAverageRating(averageRating);
            } else {
                dto.setReviewCount(0);
                dto.setAverageRating(0.0);

            }
            dto.setCity(product.getCity());
            dto.setPrice(product.getPrice());
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
          dto.setCharacteristics(product.getCharacteristics());
          dto.setCategory(product.getCategory());

          List<String> imagenesBase64 = product.getImagenes().stream().map(imagen->{
                      String base64 = Base64.getEncoder().encodeToString(imagen.getDatos());
                      return "data:" + imagen.getTipo() + ";base64," + base64;
                  }).collect(Collectors.toList());

          if (product.getReviews() != null && !product.getReviews().isEmpty()) {
              int reviewCount = product.getReviews().size();
              double averageRating = product.getReviews().stream()
                      .mapToInt(Review::getRating)
                      .average()
                      .orElse(0.0);
              dto.setReviewCount(reviewCount);
              dto.setAverageRating(averageRating);
          } else {
              dto.setReviewCount(0);
              dto.setAverageRating(0.0);
          }
          dto.setCity(product.getCity());
          dto.setPrice(product.getPrice());

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

        if (p.getReviews() != null && !p.getReviews().isEmpty()) {
            int reviewCount = p.getReviews().size();
            double averageRating = p.getReviews().stream()
                    .mapToInt(Review::getRating)
                    .average()
                    .orElse(0.0);
            respuestaDto.setReviewCount(reviewCount);
            respuestaDto.setAverageRating(averageRating);
        } else {
            respuestaDto.setReviewCount(0);
            respuestaDto.setAverageRating(0.0);

        }
        respuestaDto.setCity(p.getCity());
        respuestaDto.setPrice(p.getPrice());

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

            if (product.getReviews() != null && !product.getReviews().isEmpty()) {
                int reviewCount = product.getReviews().size();
                double averageRating = product.getReviews().stream()
                        .mapToInt(Review::getRating)
                        .average()
                        .orElse(0.0);
                dto.setReviewCount(reviewCount);
                dto.setAverageRating(averageRating);
            } else {
                dto.setReviewCount(0);
                dto.setAverageRating(0.0);

            }
            dto.setPrice(product.getPrice());
            dto.setCity(product.getCity());
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
        dto.setCategory(update.getCategory());
        dto.setCharacteristics(update.getCharacteristics());

        if (update.getReviews() != null && !update.getReviews().isEmpty()) {
            int reviewCount = update.getReviews().size();
            double averageRating = update.getReviews().stream()
                    .mapToInt(Review::getRating)
                    .average()
                    .orElse(0.0);
            dto.setReviewCount(reviewCount);
            dto.setAverageRating(averageRating);
        } else {
            dto.setReviewCount(0);
            dto.setAverageRating(0.0);
        }


        return dto;

    }

    @Override
    public List<Product> findByCategoryId(Long categoryId) {
        return productRepository.findByCategoryId(categoryId);
    }

    @Override
    public List<String> getSuggestions(String query) {
        List<Product> matches = productRepository
                .findByNameContainingIgnoreCaseOrCityContainingIgnoreCase(query, query);

        Set<String> suggestions = new LinkedHashSet<>();
        for (Product p : matches) {
            suggestions.add(p.getName());
            suggestions.add(p.getCity());
        }

        return new ArrayList<>(suggestions);
    }

    private boolean isProductAvailable(Product product, LocalDate start, LocalDate end) {
        return product.getBookings().stream()
                .noneMatch(booking ->
                        !booking.getEndDate().isBefore(start) && !booking.getStartDate().isAfter(end)
                );
    }


    @Override
    public List<ProductDto> searchProducts(String query, LocalDateTime startDate, LocalDateTime endDate) {
        List<Product> products;

        if (query != null && !query.isEmpty()) {
            products = productRepository
                    .findByNameContainingIgnoreCaseOrCityContainingIgnoreCase(query, query);
        } else {
            products = productRepository.findAll();
        }

        // Filtrar por fechas si están presentes
        if (startDate != null && endDate != null) {
            products = products.stream()
                    .filter(p -> isProductAvailable(p, startDate.toLocalDate(), endDate.toLocalDate()))
                    .toList();
        }

        // Mapear a DTO
        return products.stream().map(product -> {
            ProductDto dto = new ProductDto();
            dto.setId(product.getId());
            dto.setName(product.getName());
            dto.setDescription(product.getDescription());
            dto.setCategory(product.getCategory());
            dto.setCharacteristics(product.getCharacteristics());
            dto.setWhatsappNumber(product.getWhatsappNumber());
            dto.setCity(product.getCity());

            // Convertir imágenes a base64
            List<String> imagenesBase64 = product.getImagenes().stream()
                    .map(img -> "data:" + img.getTipo() + ";base64," +
                            Base64.getEncoder().encodeToString(img.getDatos()))
                    .toList();
            dto.setImages(imagenesBase64);

            // Calcular reseñas
            if (product.getReviews() != null && !product.getReviews().isEmpty()) {
                int reviewCount = product.getReviews().size();
                double averageRating = product.getReviews().stream()
                        .mapToInt(r -> r.getRating())
                        .average()
                        .orElse(0.0);
                dto.setReviewCount(reviewCount);
                dto.setAverageRating(averageRating);
            } else {
                dto.setReviewCount(0);
                dto.setAverageRating(0.0);
            }
            dto.setPrice(product.getPrice());
            dto.setCity(product.getCity());

            return dto;
        }).toList();
    }


    @Override
    public List<ProductDto> findByCategoryIdDto(Long categoryId) {
        List<Product> products = productRepository.findByCategoryId(categoryId);

        return products.stream().map(product -> {
            ProductDto dto = new ProductDto();
            dto.setId(product.getId());
            dto.setName(product.getName());
            dto.setDescription(product.getDescription());
            dto.setCategory(product.getCategory());
            dto.setCharacteristics(product.getCharacteristics());

            // Imágenes base64
            List<String> imagenesBase64 = product.getImagenes().stream().map(imagen -> {
                String base64 = Base64.getEncoder().encodeToString(imagen.getDatos());
                return "data:" + imagen.getTipo() + ";base64," + base64;
            }).collect(Collectors.toList());
            dto.setImages(imagenesBase64);

            // Calcular promedio y número de reseñas (si las manejas)
            if (product.getReviews() != null && !product.getReviews().isEmpty()) {
                double avg = product.getReviews().stream()
                        .mapToInt(Review::getRating)
                        .average()
                        .orElse(0.0);
                dto.setAverageRating(avg);
                dto.setReviewCount(product.getReviews().size());
            } else {
                dto.setAverageRating(0.0);
                dto.setReviewCount(0);
            }

            return dto;
        }).collect(Collectors.toList());
    }


}
