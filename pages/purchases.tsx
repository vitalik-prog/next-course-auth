import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Stripe from "stripe";
import Purchases from "../src/pages/Purchases/Purchases";

const PurchasesPage = (props) => <Purchases props={props} />;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, res } = context;
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2022-11-15",
  });

  console.log(session);
  const { data: prices } = await stripe.prices.list({
    active: true,
    limit: 100,
    expand: ["data.product"],
  });
  console.log(prices);
  return {
    props: { prices: prices || [], purchases: [] },
  };
};

export default PurchasesPage;
