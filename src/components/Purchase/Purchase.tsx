import IPurchaseProps from "./interfaces/IPurchaseProps";
import classes from "./css/Purchase.module.css";

const Purchase: React.FC<IPurchaseProps> = ({ purchase }) => (
  <div className={classes.purchase}>
    <div>
      {new Date(purchase.created * 1000).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      })}
    </div>
    <div>
      {(purchase.amount / 100).toFixed(2)} {purchase.currency.toUpperCase()}
    </div>
    <a href={purchase.receipt_url} target="_blank">
      Receipt
    </a>
  </div>
);

export default Purchase;
