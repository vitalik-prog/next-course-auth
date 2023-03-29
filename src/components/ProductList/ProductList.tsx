import IProductList from "./interfaces/IProductList";
import ProductCard from "./components/ProductCard";
import classes from "./css/ProductList.module.css";

const ProductList: React.FC<IProductList> = ({ prices, onBuy }) => (
  <div className={classes.productList}>
    {prices.map((price) => (
      <ProductCard key={price.id} price={price} onBuy={onBuy} />
    ))}
  </div>
);

export default ProductList;
