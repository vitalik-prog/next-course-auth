import ProductList from "../../components/ProductList/ProductList";
import classes from "./css/Purchases.module.css";

const Purchases = ({ prices, purchases }) => {
  return (
    <section className={classes.payments}>
      <h2>List of available products</h2>
      <ProductList prices={prices} />
      <h2>List of bought products</h2>
      {/* <PurchasesList /> */}
    </section>
  );
};

export default Purchases;
