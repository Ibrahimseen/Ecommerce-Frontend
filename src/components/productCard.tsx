import { FaPlus } from "react-icons/fa";

type PrdouctProps = {
  productId: string;
  photo: string;
  name: string;
  price: number;
  stock: number;
  handler: () => void;
};
const server = "hunain";

const ProductCard = ({
  productId,
  price,
  name, 
  photo,
  stock,
  handler,
}: PrdouctProps) => {
  return(
  
  <div className="product-card">
    <img src={photo} alt={name} />
    <p>{name}</p>
    <span>${price}</span>
    
    <div>
      <button onClick={() => handler()}>
      <FaPlus/>
      </button>
    </div>
  </div>
  )


};





export default ProductCard;


