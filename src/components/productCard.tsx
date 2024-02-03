import { FaPlus } from "react-icons/fa";
import { server } from "../redux/reducer/store";
import { cartItem } from "../types/types";

type PrdouctProps = {
  productId: string;
  photo: string;
  name: string;
  price: number;
  stock: number;
  handler: (cartitem: cartItem) => string | undefined;
};

const ProductCard = ({
  productId,
  price,
  name,
  photo,
  stock,
  handler,
}: PrdouctProps) => {
  return (
    <div className="product-card">
      <img src={`${server}/${photo}`} alt={name} />
      <p>{name}</p>
      <span>${price}</span>

      <div>
        <button
          onClick={() =>
            handler({
              productId,
              photo,
              name,
              price,
              quantity: 1,
              stock,
            })
          }
        >
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
