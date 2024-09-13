package com.mahdi.fakestore.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import com.mahdi.fakestore.service.ProductViewService;

@RestController
@CrossOrigin(origins = "*") // Allow all origins
public class ProductViewController {
    @Autowired
    private ProductViewService productViewService;

    @PostMapping("/view/{productId}")
    public int viewProduct(@PathVariable String productId) {

        return productViewService.incrementViews(productId).getViews();
    }

}
