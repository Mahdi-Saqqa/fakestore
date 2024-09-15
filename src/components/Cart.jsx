import React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CancelIcon from "@mui/icons-material/Cancel";
import { trimText } from "../utils/textTools";
const Cart = (props) => {
  const { cartCount, setCartCount } = props;

  const [toggleCart, setToggleCart] = React.useState(false);
  const [cartItems, setCartItems] = React.useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  ]);
  React.useEffect(() => {
    const updatedCart = JSON.parse(localStorage.getItem("cart")) ?? [];
    setCartItems(updatedCart);
  }, [cartCount]);

  const removeProductFromCart = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    window.localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartCount(updatedCart.length);
    
    };
  return (
    <>
      <div
        className="fixed bottom-[48px] right-[48px] rounded-full bg-primary color-white p-[8px] cursor-pointer hover:p-[12px]"
        onClick={() => setToggleCart(!toggleCart)}
        data-testid="cart-icon"
      >
        {cartCount > 0 && (
          <span class="absolute aspect-square  rounded-full p-[2px] bg-[#ffce48] top-[-8px] left-[-8px]   ">
            {cartCount}
          </span>
        )}
        <ShoppingCartIcon sx={{ color: "white" }} />
      </div>
      {toggleCart && (
        <div className="fixed flex flex-col w-[600px] translate-x-[-50%] translate-y-[-50%] rounded-xl bg-primary gap-[24px] h-[600px]  top-[50%] left-[50%] p-[24px] "
        data-testid="Shopping-Cart"
        >
          <CancelIcon
            onClick={() => setToggleCart(false)}
            className="absolute top-[8px] left-[8px] cursor-pointer "
            sx={{ color: "#ffce48" }}
          />
          <h1 className="text-white text-4xl text-center p-[24px]">
            Shopping Cart
          </h1>
          <div className="flex flex-col gap-[8px] max-h-[400px]  overflow-auto p-[16px]		">
            {cartItems.map((item, idx) => (
              <div className="flex justify-between p-[8px] bg-[white] rounded-xl items-center opacity-90">
                <img
                  src={item.image}
                  className="w-[60px] aspect-square"
                  alt={item.title}
                ></img>
                <h2>{trimText(item.title, 18)}</h2>

                <div className="flex space-around gap-[4px]  ">
                  {item.price}$ x {item.quantity}
                </div>
                <div>{item.price * item.quantity}$</div>

                <DeleteForeverIcon
                    onClick={() => removeProductFromCart(item.id)}
                  sx={{
                    color: "red",
                    cursor: "pointer",
                  }}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between p-[8px] bg-[white] rounded-xl items-center opacity-90">
            <h2>Total</h2>
            <div>
              {(cartItems.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
              )).toFixed(2)}
              $
            </div>
            <button className="bg-[#ffce48] p-[8px] rounded-xl">
              Checkout
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
