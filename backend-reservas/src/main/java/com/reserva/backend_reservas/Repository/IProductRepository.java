package com.reserva.backend_reservas.Repository;


import com.reserva.backend_reservas.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IProductRepository extends JpaRepository<Product, Long> {

    /* con este metodo verificamos el nombre en la base de datos para que no se pueda crear otro igual*/
    boolean existsByNameIgnoreCase(String name);

    /* con esto devolvemos una lista de productos aleatorios con el limite de productos que decidamos*/
    @Query(value = "SELECT * FROM product ORDER BY RAND() LIMIT 10", nativeQuery = true)
    List<Product> getRandomProducts();
    List<Product> findByCategoryId(Long categoryId);

    List<Product> findByNameContainingIgnoreCaseOrCityContainingIgnoreCase(String name, String city);

}
