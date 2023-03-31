import Image from "next/image";
import classes from "./css/Product.module.css";

const Product = ({ price }) => {
  console.log(price);
  return (
    <div className={classes.product}>
      <div className={classes.imgWrapper}>
        <Image
          src={price.product.images[0]}
          alt={price.product.name}
          width={800}
          height={800}
        />
      </div>
      <h1>{price.product.name}</h1>
      <hr />
      <div className={classes.label}>
        <strong>Description:</strong>
      </div>
      <p>{price.product.description}</p>
      <div className={classes.label}>
        <strong>Price:</strong>
      </div>
      <div className={classes.price}>
        {(price.unit_amount / 100).toFixed(2)} {price.currency.toUpperCase()}
      </div>
    </div>
  );
};

export default Product;
