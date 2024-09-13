import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import useSWR from "swr";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import StarRateIcon from "@mui/icons-material/StarRate";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import { Button } from "@mui/material";

const fetcher = (url) => axios.get(url).then((res) => res.data);
const postFetcher = (url, data) =>axios.post(url,data).then((res) => res.data);


const ProductPage = (props) => {
  const { cartCount, setCartCount } = props;
  const { productId } = useParams();
  const [quantity, setQuantity] = React.useState(1);
  const [isInCart, setIsInCart] = React.useState(false);
  const {
    data: views,
  } = useSWR(`http://localhost:8080/view/${productId}`, postFetcher);


  const removeProductFromCart = () => {
    const cart = JSON.parse(window.localStorage.getItem("cart")) ?? [];
    const newCart = cart.filter((item) => item.id !== productId);
    window.localStorage.setItem("cart", JSON.stringify(newCart));
    setCartCount(newCart.length);
    setIsInCart(false);
    console.log("Product removed from cart");
  };
  const addProductToCart = () => {
    const cart = JSON.parse(window.localStorage.getItem("cart")) ?? [];
    console.log(cart);
    cart.push({
      id: productId,
      title: product.title,
      image: product.image,
      price: product.price,
      quantity,
    });
    window.localStorage.setItem("cart", JSON.stringify(cart));
    setCartCount(cart.length);
    setIsInCart(true);
    console.log("Product added to cart");
  };

  React.useEffect(() => {
    const cart = JSON.parse(window.localStorage.getItem("cart")) ?? [];
    console.log(cart);
    const found = cart.find((item) => item.id === productId);
    console.log(found);
    if (found) {
      setIsInCart(true);
    }
  }, [cartCount, productId]);

  const {
    data: product,
    isLoading: productLoading,
  } = useSWR(`https://fakestoreapi.com/products/${productId}`, fetcher);
  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  return (
    !productLoading && (
      <div className="h-[100vh]">
        <div className="flex p-16 gap-8">
          <ArrowBackIcon
            onClick={() => window.history.back()}
            className="cursor-pointer"
          />
          <span className="">FakeStore/{product.category}</span>
        </div>
        <div className="flex lg:flex-row flex-col px-32 gap-16 justify-between">
          <div className=" flex flex-col justify-between lg:basis-2/4 xl:basis-1/4">
            <div>
              <h2 className="text-2xl font-semibold my-7">{product.title}</h2>

              <div className="flex justify-between">
                <span className="">
                  <b>$</b> {product.price}
                </span>
                <div className="text-sm font-thin	 flex items-center">
                  {Array.from(
                    { length: Math.floor(product.rating.rate) },
                    (_, idx) => (
                      <StarRateIcon
                        sx={{ width: "24px", color: "#ffc41f" }}
                        key={idx}
                      />
                    )
                  )}
                  {product.rating.rate % 1 !== 0 && (
                    <StarHalfIcon sx={{ width: "24px", color: "#ffc41f" }} />
                  )}
                  {Array.from(
                    { length: 5 - Math.ceil(product.rating.rate) },
                    (_, idx) => (
                      <StarOutlineIcon
                        sx={{ width: "24px", color: "#ffc41f" }}
                        key={idx}
                      />
                    )
                  )}
                  {product.rating.rate} ({product.rating.count})
                </div>
              </div>
              <Typography variant="body2">
                <b>Viewd:</b> {views}
              </Typography>
              <Typography variant="body2">
                <b>Category:</b> {product.category}
              </Typography>
              <Typography variant="body2">
                <b>Description:</b> {product.description}
              </Typography>
              {isInCart ? (
                <div className="flex items-center space-x-4 my-8">
                  <Button
                    variant="contained"
                    color="error"                    onClick={removeProductFromCart}
                  >
                    Remove from Cart
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-4 my-8">
                  <div className="flex items-center border border-gray-300 rounded-md">
                    <button
                      onClick={handleDecrease}
                      className="px-3 py-1 text-lg text-gray-600 hover:text-gray-800 focus:outline-none"
                    >
                      –
                    </button>
                    <span className="px-3 py-1 text-lg">{quantity}</span>
                    <button
                      onClick={handleIncrease}
                      className="px-3 py-1 text-lg text-gray-600 hover:text-gray-800 focus:outline-none"
                    >
                      +
                    </button>
                  </div>
                  <Button
                    onClick={addProductToCart}
                    variant="contained"
                    color="primary"
                    className="bg-teal-500 hover:bg-teal-600"
                  >
                    Add to Cart
                  </Button>
                </div>
              )}
            </div>
          </div>
          <div className="basis-2/6">
            <img src={product.image} alt={product.title} className=" aspect-square"></img>
          </div>
        </div>
      </div>
    )
  );
};

export default ProductPage;
