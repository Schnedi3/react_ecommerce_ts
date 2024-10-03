import { Request, Response } from "express";
import Stripe from "stripe";

import { FRONTEND_URL, STRIPE_SECRET_KEY } from "../config/config";
const stripe = new Stripe(STRIPE_SECRET_KEY as string);

export const createCheckoutSession = async (req: Request, res: Response) => {
  const { cartItems, address_id, amount, payment_method } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: cartItems.map((item: any) => ({
        price_data: {
          currency: "eur",
          product_data: {
            name: item.title,
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: `${FRONTEND_URL}/confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${FRONTEND_URL}/cart`,
      customer_email: req.user.email,
      metadata: { address_id, payment_method, amount },
    });

    res.json({ success: true, id: session.id });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getCheckoutSession = async (req: Request, res: Response) => {
  const { session_id } = req.query;

  try {
    const session = await stripe.checkout.sessions.retrieve(
      session_id as string
    );
    res.json(session);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
