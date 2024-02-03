import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Skeleton } from "../components/loader";
import ProductCard from "../components/productCard";
import { useLatestProductsQuery } from "../redux/api/productAPI";
import { addtoCart } from "../redux/reducer/cartReducer";
import { cartItem } from "../types/types";

const Home = () => {
  const { data, isLoading, isError } = useLatestProductsQuery("");

  const dispatch = useDispatch();

  const addToCartHandler = (cartitem: cartItem) => {
    if (cartitem.stock < 1) return toast.error("Out OF Stock");
    dispatch(addtoCart(cartitem));
    toast.success("adedd To Cart");
  };

  if (isError) toast.error("cannot fetch the products");
  return (
    <div className="home">
      <section> </section>

      <h1 style={{ fontWeight: "400" }}>
        Latest Products
        <Link to={"/search"} className="findmore">
          More
        </Link>
      </h1>
      <main>
        {isLoading ? (
          <Skeleton length={9} width="80vw" />
        ) : (
          data?.products.map((i) => (
            <ProductCard
              key={i._id}
              productId={i._id}
              name={i.name}
              price={i.price}
              stock={i.stock}
              handler={addToCartHandler}
              photo={i.photo}
            />
          ))
        )}
      </main>
    </div>
  );
};

export default Home;
