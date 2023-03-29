import Image from "next/image";
import classes from "./css/ProductCard.module.css";
import IProductCard from "./interfaces/IProductCard";

const ProductCard: React.FC<IProductCard> = ({ price, onBuy }) => {
  return (
    <div className={classes.product}>
      <div className={classes.imgWrapper}>
        {price?.product?.images[0] && (
          <Image fill src={price.product.images[0]} alt={price.product.name} />
        )}
        <span>
          {(price.unit_amount / 100).toFixed(2)} {price.currency.toUpperCase()}
        </span>
      </div>
      <h3>{price.product.name}</h3>
      <p>{price.product.description}</p>
      <div className={classes.action}>
        <button onClick={onBuy.bind(null, price.id)}>Buy</button>
      </div>
    </div>
  );
};

export default ProductCard;
