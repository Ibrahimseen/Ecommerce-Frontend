import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { server } from "../redux/reducer/store";
import { cartItem } from "../types/types";

type carditemPorps = {
  cartitem: cartItem;
  incrementHandler: (cartitem: cartItem) => void;
  deccrementHandler: (cartitem: cartItem) => void;
  removeHandler: (id: string) => void;
};

const Cartitems = ({
  cartitem,
  incrementHandler,
  deccrementHandler,
  removeHandler,
}: carditemPorps) => {
  const { photo, name, quantity, price, productId } = cartitem;
  return (
    <div className="cart-items">
      <img src={`${server}/${photo}`} alt={name} />
      <article>
        <Link to={`/product/${productId}`}>{name}</Link>
        <span>${price}</span>
      </article>
      <div>
        <button onClick={() => deccrementHandler(cartitem)}>-</button>
        <p>{quantity}</p>
        <button onClick={() => incrementHandler(cartitem)}>+</button>
      </div>
      <button onClick={() => removeHandler(productId)}>
        <FaTrash />
      </button>
    </div>
  );
};

export default Cartitems;
