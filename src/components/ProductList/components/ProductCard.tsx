import Image from "next/image";
import classes from "./css/ProductCard.module.css";
import Link from "next/link";
import IProductCard from "./interfaces/IProductCard";

const ProductCard: React.FC<IProductCard> = ({ price, onBuy }) => {
  return (
    <div className={classes.product}>
      <div className={classes.imgWrapper}>
        {price?.product?.images[0] && (
          <Image
            fill
            src={price.product.images[0]}
            alt={price.product.name}
            sizes="75vh"
          />
        )}
        <span>
          {(price.unit_amount / 100).toFixed(2)} {price.currency.toUpperCase()}
        </span>
      </div>
      <h3>{price.product.name}</h3>
      <p>{price.product.description}</p>
      <div className={classes.action}>
        <button className={classes.button} onClick={onBuy.bind(null, price.id)}>
          Buy
        </button>
        <Link href={`/product/${price.id}`} className={classes.button}>
          Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
