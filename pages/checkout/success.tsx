import { GetServerSideProps } from "next";
import Stripe from "stripe";
import ICheckoutSuccessProps from "../../src/interfaces/pages/ICheckoutSuccessProps";
import CheckoutSuccess from "../../src/pages/CheckoutSuccess/CheckoutSuccess";
import ProtectedRoute from "../../src/hoc/ProtectedRoute";

const CheckoutSuccessPage: React.FC<ICheckoutSuccessProps> = ({
  orderInfo,
}) => (
  <ProtectedRoute>
    <CheckoutSuccess orderInfo={orderInfo} />
  </ProtectedRoute>
);

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { sessionId } = ctx.query as { sessionId: string };

  if (!sessionId || !sessionId.startsWith("cs_")) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2022-11-15",
    });

    const orderInfo = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["payment_intent", "line_items.data.price.product"],
    });

    return {
      props: {
        orderInfo,
      },
    };
  } catch (error: unknown) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }
};

export default CheckoutSuccessPage;
