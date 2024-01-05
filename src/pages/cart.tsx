import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import Cartitems from "../components/cart-items";
import { Link } from "react-router-dom";

const cartitems = [
  {
    productId :"hunain",
    photo : "https://m.media-amazon.com/images/I/316ArzLeJ2L._SS400_.jpg",
    name:"macbook",
    stock:"10",
    quantity:"40",
    price:"3000",
  }
];
const subtotal = 4000;
const tax = Math.round(subtotal * 0.18);
const shippingcharges = 200;
const total = subtotal + tax + shippingcharges;
const discount = 400;

const Cart = () => {
  const [couponCode, setcouponCode] = useState<String>("");
  const [isValidcouponCode, setisValidcouponCode] = useState<boolean>(false);

  useEffect(() => {
 const TimeoutID = setTimeout(() => {

  if(Math.random() > 0.5) setisValidcouponCode(true);
  else(setisValidcouponCode(false)) 
 }, 1000);  
    return () => {
      clearTimeout(TimeoutID)
      setisValidcouponCode(false)
    }
  }, [couponCode])
  

  return (
    <div className="cart">
  <main>

  { cartitems.length > 0 ? (
    cartitems.map((i, idx) => 
      <Cartitems key={idx} cartitems={i} />
    )) : (
    <h1>No item select To add</h1>
  )
}
</main>



      <aside>
        <p>Subtotal : ${subtotal}</p>
        <p>Shipping - charges : ${shippingcharges}</p>
        <p>Tax : ${tax}</p>
        <p>
          Discount : <em className="red"> - ${discount} </em>
        </p>
        <p>
          <b> Total : ${total}</b>
        </p>
        <input
          type="text"
          value={couponCode}
          placeholder="Copuon Code"
          onChange={(e) => setcouponCode(e.target.value)}
        />
        {couponCode && (
           isValidcouponCode ? (
            <span className="green">
              ${discount} of using The <code>{couponCode}  Coupon</code>
            </span>
          ) : (
            <span className="red">
              Invalid Coupun <VscError />
            </span>
          )
        )}
        {
          cartitems.length > 0 && <Link to={"/shipping"}> Checkout</Link>
        }
      </aside>
    </div>
  );
};

export default Cart;
