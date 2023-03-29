import type { NextApiRequest, NextApiResponse } from "next";
import {
  getStripePayments,
  createCheckoutSession,
} from "@stripe/firestore-stripe-payments";
import { app } from "../../../src/helpers/firebaseDb";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { priceId } = req.body;

      console.log("stripe/index.ts");
      console.log(priceId);

      const payments = getStripePayments(app, {
        productsCollection: "products",
        customersCollection: "customers",
      });

      const session = await createCheckoutSession(payments, {
        price: priceId,
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/cancel",
      });
      console.log(session);

      res.status(200).json({ session });
    } catch (error) {
      res.status(500).json({ statusCode: 500, message: error.message });
    }
  }
}

export default handler;
