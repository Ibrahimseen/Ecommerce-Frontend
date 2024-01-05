import { Link } from "react-router-dom"
import ProductCard from "../components/productCard"

const Home = () => {
  const addToCartHandler = () => {

  }
  return (
    <div className="home">
      <section> </section>

      <h1>Latest Products
      <Link to={"/search"} className="findmore"> More </Link>
      </h1>
      <main> 
        <ProductCard productId="hunain" name="Mackbook" price={4045} stock={435} handler={addToCartHandler} photo="https://m.media-amazon.com/images/I/316ArzLeJ2L._SS400_.jpg" />
      </main>
    </div>
  )
}

export default Home

