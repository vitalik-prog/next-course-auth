import {
  getStripePayments,
  createCheckoutSession,
} from "@stripe/firestore-stripe-payments";
import { initializeApp, getApp, getApps } from "firebase/app";
import ProductList from "../../components/ProductList/ProductList";
import IPurchasesPageProps from "../../interfaces/pages/IPurchasesPageProps";
import { app, auth } from "../../../src/helpers/firebaseDb";
import classes from "./css/Purchases.module.css";

const Purchases = ({ prices, purchases, session }: IPurchasesPageProps) => {
  const onHandleBuy = async (priceId: string) => {
    // const response = await fetch("/api/stripe", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ priceId }),
    // });

    console.log("onHandleBuy");
    console.log(auth);
    const payments = getStripePayments(app, {
      productsCollection: "products",
      customersCollection: "customers",
    });
    console.log(payments);
    const session = await createCheckoutSession(payments, {
      price: priceId,
      success_url: "https://example.com/payments/success",
      cancel_url: "https://example.com/payments/cancel",
    });
    window.location.assign(session.url);
  };

  return (
    <section className={classes.payments}>
      <h2>List of available products</h2>
      <ProductList prices={prices} onBuy={onHandleBuy} />
      <h2>List of bought products</h2>
      {/* <PurchasesList /> */}
    </section>
  );
};

export default Purchases;
