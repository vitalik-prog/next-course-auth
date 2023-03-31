import { useContext, useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import NotificationContext from "../../context/Notification/NotificationContext";
import ProductList from "../../components/ProductList/ProductList";
import IPurchasesPageProps from "../../interfaces/pages/IPurchasesPageProps";
import { useAuth } from "../../context/Auth/AuthContext";
import Purchase from "../../components/Purchase/Purchase";
import IPurchase from "../../common/interfaces/IPurchase";
import classes from "./css/Purchases.module.css";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const Purchases = ({ prices }: IPurchasesPageProps) => {
  const { showNotification } = useContext(NotificationContext);
  const { user } = useAuth();
  const [purchasesList, setPurchasesList] = useState<IPurchase[] | []>([]);

  useEffect(() => {
    if (user) {
      fetch(`/api/stripe/payments/${user.uid}`)
        .then((res) => res.json())
        .then(({ error, payments }) => {
          if (error) {
            showNotification({
              title: "Error!",
              message: "List of purchases could not be loaded!",
              status: "error",
            });
            return;
          }

          setPurchasesList(payments.data || []);
        })
        .catch(() => {
          showNotification({
            title: "Error!",
            message: "List of purchases could not be loaded!",
            status: "error",
          });
        });
    }
  }, []);

  const onHandleBuy = async (priceId: string) => {
    try {
      const lineItems = [{ price: priceId, quantity: 1 }];
      const {
        error: customError,
        session,
        message,
      } = await fetch("/api/stripe/sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lineItems,
          userEmail: user?.email,
          userId: user?.uid,
        }),
      }).then((res) => res.json());

      if (customError) {
        showNotification({
          title: "Error!",
          message:
            typeof message === "string" ? message : "Something went wrong!",
          status: "error",
        });
        return;
      }

      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (error) {
        showNotification({
          title: "Error!",
          message:
            typeof error.message === "string"
              ? error.message
              : "Something went wrong!",
          status: "error",
        });
      }
    } catch (error) {
      showNotification({
        title: "Error!",
        message: typeof error === "string" ? error : "Something went wrong!",
        status: "error",
      });
    }
  };

  return (
    <section className={classes.payments}>
      <h2>List of available products</h2>
      <ProductList prices={prices} onBuy={onHandleBuy} />
      {purchasesList.length > 0 && (
        <>
          <h2>List of bought products</h2>
          {purchasesList.map((purchase) => (
            <Purchase purchase={purchase} key={purchase.id} />
          ))}
          <div className={classes.totalRow}>
            <strong>Total:</strong>
            <span>
              {(
                (purchasesList || []).reduce(
                  (acc, purchase) => acc + purchase.amount,
                  0
                ) / 100
              ).toFixed(2)}
            </span>
          </div>
        </>
      )}
    </section>
  );
};

export default Purchases;
