package com.mahdi.fakestore.repository;

import com.mahdi.fakestore.model.ProductView;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductViewRepository extends JpaRepository<ProductView, String> {

}
