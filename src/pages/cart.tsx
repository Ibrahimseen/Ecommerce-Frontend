import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { VscError } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartitemsCard from "../components/cart-items";
import {
  addtoCart,
  calculatePrice,
  discountApplied,
  removeCartItem,
} from "../redux/reducer/cartReducer";
import { CartreducerinitialState } from "../types/reducer-type";
import { cartItem } from "../types/types";
import { server } from "../redux/reducer/store";

const Cart = () => {
  const { cartItems, subtotal, tax, total, discount, shippingCharges } =
    useSelector(
      (state: { cartReducer: CartreducerinitialState }) => state.cartReducer
    );

  const dispatch = useDispatch();

  const [couponCodes, setcouponCode] = useState<string>("");
  const [isValidcouponCode, setisValidcouponCode] = useState<boolean>(false);

  const incrementHandler = (cartitem: cartItem) => {
    if (cartitem.quantity >= cartitem.stock) {
      return toast.error("out of Stock");
    }
    dispatch(addtoCart({ ...cartitem, quantity: cartitem.quantity + 1 }));
  };

  const deccrementHandler = (cartitem: cartItem) => {
    if (cartitem.quantity <= 1) {
      return toast.error("dont select quantity in -");
    }
    dispatch(addtoCart({ ...cartitem, quantity: cartitem.quantity - 1 }));
  };

  const removeHandler = (productId: string) => {
    dispatch(removeCartItem(productId));
  };

  useEffect(() => {
    const { token: cancelToken, cancel } = axios.CancelToken.source();

    const TimeoutID = setTimeout(() => {
      axios
        .get(`${server}/api/v1/payment/discount?coupon=${couponCodes}`, {
          cancelToken,
        })
        .then((res) => {
          dispatch(discountApplied(res.data.discount));
          dispatch(calculatePrice());
          setisValidcouponCode(true);
        })
        .catch(() => {
          dispatch(discountApplied(0));
          dispatch(calculatePrice());
          setisValidcouponCode(false);
        });
    }, 1000);

    return () => {
      clearTimeout(TimeoutID);
      cancel();
      setisValidcouponCode(false);
    };
  }, [couponCodes]);
  
  useEffect(() => {
    dispatch(calculatePrice());
  }, [cartItems]);

  return (
    <div className="cart">
      <main>
        {cartItems.length > 0 ? (
          cartItems.map((i, idx) => (
            <CartitemsCard
              incrementHandler={incrementHandler}
              deccrementHandler={deccrementHandler}
              removeHandler={removeHandler}
              key={idx}
              cartitem={i}
            />
          ))
        ) : (
          <h1>No item select To add</h1>
        )}
      </main>

      <aside>
        <p>Subtotal : ${subtotal}</p>
        <p>Shipping - charges : ${shippingCharges}</p>
        <p>Tax : ${tax}</p>
        <p>
          Discount : <em className="red"> - ${discount} </em>
        </p>
        <p>
          <b> Total : ${total}</b>
        </p>

        <input
          type="text"
          placeholder="Copuon Code"
          onChange={(e) => setcouponCode(e.target.value)}
        />
        {couponCodes &&
          (isValidcouponCode ? (
            <span className="green">
              ${discount} of using The <code>{couponCodes} Coupon</code>
            </span>
          ) : (
            <span className="red">
              Invalid Coupun <VscError />
            </span>
          ))}
        {cartItems.length > 0 && <Link to={"/shipping"}> Checkout</Link>}
      </aside>
    </div>
  );
};

export default Cart;
