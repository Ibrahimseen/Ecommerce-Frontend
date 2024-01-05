import { useState } from "react";
import ProductCard from "../components/productCard";

const Search = () => {
  const [search, setsearch] = useState("");
  const [sort, setSort] = useState("");
  const [maxPrice, setMaxprice] = useState(10000);
  const [Category, setCategory] = useState("");
  const [page, setpage] = useState(1);

  const addToCartHandler = () => {};
  const isNextPage = page < 4;
  const isprevPage = page > 1;
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
        <h4>Category</h4>
        <select
          value={Category}
          onChange={(e) => setCategory(e.target.value)}
        >

            <option value="">All</option>
            <option value="">sample1</option>
            <option value="">sample2</option>
          </select>
        </div>
      </aside>
      <main >
        <h1>Products</h1>
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setsearch(e.target.value)}
        />

          <div className="search-product-list">
        <ProductCard
          productId="hunain"
          name="Mackbook"
          price={4045}
          stock={435}
          handler={addToCartHandler}
          photo="https://m.media-amazon.com/images/I/316ArzLeJ2L._SS400_.jpg"
        />
        </div>
        <article>
          <button disabled={!isprevPage} onClick={() => setpage((prev) => prev - 1)}>page</button>
          <span>
            {page} of {4}
          </span>
          <button  disabled={!isNextPage} onClick={() => setpage((prev) => prev + 1)}>Next</button>
        </article>
      </main>
    </div>
  );
};

export default Search;
