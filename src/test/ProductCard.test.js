import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import ProductCard from "../components/ProductCard";
import { BrowserRouter as Router } from "react-router-dom";

const product = {
    id: 1,
    title: "Product 1",
    price: 100,
    image: "https://via.placeholder.com/150",
    description: "Description 1",
};

test("Test if ProductCard renders", () => {
    render(<Router><ProductCard product={product} /></Router>);
    const productCard = screen.queryByTestId("product-card");
    expect(productCard).toBeInTheDocument();
    }
);




test("test if price is displayed", () => {
    render(<Router><ProductCard product={product} /></Router>);
    const price = screen.queryByText("100 $");
    expect(price).toBeInTheDocument();
    }
);



