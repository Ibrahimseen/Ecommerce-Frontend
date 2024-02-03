import { useState } from "react";
import ProductCard from "../components/productCard";
import {
  useCategoriesQuery,
  useSearchProductsQuery,
} from "../redux/api/productAPI";
import { CustomError } from "../types/api-type";
import toast from "react-hot-toast";
import { Skeleton } from "../components/loader";
import { useDispatch } from "react-redux";
import { cartItem } from "../types/types";
import { addtoCart } from "../redux/reducer/cartReducer";

const Search = () => {
  const {
    data: categoriesResponse,
    isLoading: loadingCategories,
    isError,
    error,
  } = useCategoriesQuery("");

  const [search, setsearch] = useState("");
  const [sort, setSort] = useState("");
  const [maxPrice, setMaxprice] = useState(10000);
  const [category, setcategory] = useState("");
  const [page, setpage] = useState(1);

  const {
    isLoading: productLoading,
    data: SearchedData,
    isError: ProductisError,
    error: ProductError,
  } = useSearchProductsQuery({
    search,
    sort,
    category,
    page,
    price: maxPrice,
  });

  const dispatch = useDispatch();

  const addToCartHandler = (cartitem: cartItem) => {
    if (cartitem.stock < 1) return toast.error("Out OF Stock");
    dispatch(addtoCart(cartitem));
    toast.success("adedd To Cart");
  };

  const isNextPage = page < 4;
  const isprevPage = page > 1;

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

  if (ProductisError) {
    const err = ProductError as CustomError;
    toast.error(err.data.message);
  }

  return (
    <div className="product-search-page">
      <aside>
        <h2>Filters</h2>
        <div>
          <h4>Sort</h4>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">None</option>
            <option value="asc">Price (Low to High)</option>
            <option value="dsc">Price (High to Low)</option>
          </select>
        </div>

        <div>
          <h4>Max Price: {maxPrice || ""}</h4>
          <input
            type="range"
            min={100}
            max={100000}
            value={maxPrice}
            onChange={(e) => setMaxprice(Number(e.target.value))}
          />
        </div>

        <div>
          <h4>category</h4>
          <select
            value={category}
            onChange={(e) => setcategory(e.target.value)}
          >
            <option value="">ALL</option>
            {!loadingCategories === false ||
              categoriesResponse?.categories.map((i) => (
                <option key={i} value={i}>
                  {i.toUpperCase()}
                </option>
              ))}
            console.log(categories)
          </select>
        </div>
      </aside>
      <main>
        <h1>Products</h1>
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setsearch(e.target.value)}
        />

        {productLoading ? (
          <Skeleton length={10} />
        ) : (
          <div className="search-product-list">
            {SearchedData?.products.map((i) => (
              <ProductCard
                key={i._id}
                productId={i._id}
                name={i.name}
                price={i.price}
                stock={i.stock}
                handler={addToCartHandler}
                photo={i.photo}
              />
            ))}
          </div>
        )}
        {SearchedData?.totalPage! > 1 && (
          <article>
            <button
              disabled={!isprevPage}
              onClick={() => setpage((prev) => prev - 1)}
            >
              page
            </button>
            <span>
              {page} of {SearchedData?.totalPage}
            </span>
            <button
              disabled={!isNextPage}
              onClick={() => setpage((prev) => prev + 1)}
            >
              Next
            </button>
          </article>
        )}
      </main>
    </div>
  );
};

export default Search;
