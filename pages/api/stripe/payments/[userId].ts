import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const { userId } = req.query;

      const payments = await stripe.charges.search({
        query: `metadata["userId"]:"${userId}"`,
      });

      res.status(200).json({ error: false, payments });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ error: true, message: error.message || error.toString() });
    }
  } else {
    res.status(400).json({ error: true, message: "Invalid request" });
  }
}

export default handler;
