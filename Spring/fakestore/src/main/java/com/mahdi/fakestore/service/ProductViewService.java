package com.mahdi.fakestore.service;


import com.mahdi.fakestore.model.ProductView;
import com.mahdi.fakestore.repository.ProductViewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductViewService {
    @Autowired
    private ProductViewRepository productViewRepository;

    public ProductView getOrCreateProductView(String productId) {
        return productViewRepository.findById(productId).orElseGet(() -> {
            ProductView newProductView = new ProductView();
            newProductView.setProductId(productId);
            newProductView.setViews(0);
            return productViewRepository.save(newProductView);
        });
    }

    public ProductView incrementViews(String productId) {
        ProductView productView = getOrCreateProductView(productId);
        productView.setViews(productView.getViews() + 1);
        return productViewRepository.save(productView);
    }
}
