import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { lineItems, userEmail, userId } = req.body;

      if (!lineItems || lineItems.length === 0) {
        res.status(400).json({ statusCode: 400, message: "Choose products" });
      }

      const session = await stripe.checkout.sessions.create({
        customer_email: userEmail,
        line_items: lineItems,
        mode: "payment",
        success_url: `${req.headers.origin}/checkout/success?sessionId={CHECKOUT_SESSION_ID}`,
        cancel_url: req.headers.origin,
        metadata: {
          userId,
        },
        payment_intent_data: {
          metadata: {
            userId,
          },
        },
      });

      res.status(200).json({ error: false, session });
    } catch (error) {
      res
        .status(500)
        .json({ error: true, message: error.message || error.toString() });
    }
  }
}

export default handler;
