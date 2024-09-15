import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';

import Cart from "../components/Cart";




test("Test if Cart Icon rendered", () => {
    render(<Cart />);
    const cartIcon = screen.getByTestId("cart-icon");
    expect(cartIcon).toBeInTheDocument();
    }
);


test("Test if Cart Icon toggles Cart", () => {
    render(<Cart />);
    const cartIcon = screen.getByTestId("cart-icon");
    let cart = screen.queryByTestId("Shopping-Cart");
    expect(cart).not.toBeInTheDocument();
    fireEvent.click(cartIcon);
    cart = screen.getByTestId("Shopping-Cart");
    expect(cart).toBeInTheDocument();
    fireEvent.click(cartIcon);
    cart = screen.queryByTestId("Shopping-Cart");
    expect(cart).not.toBeInTheDocument();
    }
);













