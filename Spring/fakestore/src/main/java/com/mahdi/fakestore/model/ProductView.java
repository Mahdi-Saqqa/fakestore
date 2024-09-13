package com.mahdi.fakestore.model;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class ProductView {

    @Id
    private String productId;
    private int views;

    public String getProductId() {
        return productId;
    }

    public void setProductId(String productId) {
        this.productId = productId;
    }

    public int getViews() {
        return views;
    }

    public void setViews(int views) {
        this.views = views;
    }
}
