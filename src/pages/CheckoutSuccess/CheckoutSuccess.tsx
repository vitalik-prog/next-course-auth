import Image from "next/image";
import React from "react";
import ICheckoutSuccessProps from "../../interfaces/pages/ICheckoutSuccessProps";
import classes from "./css/CheckoutSuccess.module.css";

const CheckoutSuccess: React.FC<ICheckoutSuccessProps> = ({ orderInfo }) => (
  <div className={classes.checkoutSuccess}>
    <h3>Payment successful</h3>
    <h1>Thank you for your purchase!</h1>
    <p>
      We appreciate your order and hope you enjoy your new product.
      <br />
      We promise to deliver it as soon as possible.
    </p>
    <strong>
      <div>Order number</div>
    </strong>
    <h4>{orderInfo.payment_intent.id}</h4>
    <hr />
    <div className={classes.productInfo}>
      <div className={classes.image}>
        {orderInfo.line_items?.data[0]?.price?.product?.images[0] && (
          <Image
            src={orderInfo.line_items.data[0].price.product.images[0]}
            alt={
              orderInfo.line_items?.data[0]?.price?.product?.name || "Product"
            }
            fill
            sizes="75vh"
          />
        )}
      </div>
      <div className={classes.title}>
        <strong>
          {orderInfo.line_items?.data[0]?.price?.product?.name || "Product"}
        </strong>
        <p>
          {orderInfo.line_items?.data[0]?.price?.product?.description ||
            "Product description"}
        </p>
      </div>
      <div className={classes.quantity}>
        <strong>Quantity:&nbsp;</strong>
        <span>{orderInfo.line_items?.data[0]?.quantity || 1}</span>
        <span className={classes.separator}>|</span>
        <strong>Price:&nbsp;</strong>
        <span>
          {(orderInfo.line_items?.data[0]?.amount_subtotal || 0) / 100}{" "}
          {(orderInfo.line_items?.data[0]?.currency || "UAH").toUpperCase()}
        </span>
      </div>
    </div>
    <hr />
    <div className={classes.paymentInformation}>
      <div className={classes.card}>
        <strong>Payment information</strong>
        <span>
          Method: {orderInfo.payment_method_types[0]?.toUpperCase() || ""}
        </span>
        <span>Status: {orderInfo.payment_status?.toUpperCase() || ""}</span>
        <span>
          Date:{" "}
          {new Date(orderInfo.payment_intent?.created * 1000).toUTCString() ||
            ""}
        </span>
      </div>
      <div className={classes.address}>
        <strong>Billing address</strong>
        <span>Name: {orderInfo.customer_details?.name || ""}</span>
        <span>Email: {orderInfo.customer_details?.email || ""}</span>
        <span>
          Country:{" "}
          {orderInfo.customer_details?.address?.country?.toUpperCase() || ""}
        </span>
      </div>
    </div>
    <hr />
    <div className={classes.amounts}>
      <div className={classes.row}>
        <strong>Subtotal:</strong>
        <span>
          {(orderInfo.line_items?.data[0]?.amount_subtotal || 0) / 100}{" "}
          {(orderInfo.line_items?.data[0]?.currency || "UAH").toUpperCase()}
        </span>
      </div>
      <div className={classes.row}>
        <strong>Discount:</strong>
        <span>
          {(orderInfo.total_details.amount_discount || 0) / 100}{" "}
          {(orderInfo.line_items?.data[0]?.currency || "UAH").toUpperCase()}
        </span>
      </div>
      <div className={classes.row}>
        <strong>Tax:</strong>
        <span>
          {(orderInfo.total_details.amount_tax || 0) / 100}{" "}
          {(orderInfo.line_items?.data[0]?.currency || "UAH").toUpperCase()}
        </span>
      </div>
      <div className={classes.row}>
        <strong>Total:</strong>
        <span>
          {(orderInfo.line_items?.data[0]?.amount_total || 0) / 100}{" "}
          {(orderInfo.line_items?.data[0]?.currency || "UAH").toUpperCase()}
        </span>
      </div>
    </div>
  </div>
);

export default CheckoutSuccess;
