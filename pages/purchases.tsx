import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Stripe from "stripe";
import { getAuth } from "firebase/auth";
import Purchases from "../src/pages/Purchases/Purchases";
import IPurchasesPageProps from "../src/interfaces/pages/IPurchasesPageProps";
import { app } from "../src/helpers/firebaseDb";
import ProtectedRoute from "../src/hoc/ProtectedRoute";

const PurchasesPage = (props: IPurchasesPageProps) => (
  <ProtectedRoute>
    <Purchases {...props} />
  </ProtectedRoute>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  const session = await getSession({ req });
  console.log("getServerSideProps");
  const auth = getAuth(app);
  const user = auth;
  console.log(user);
  // if (!session) {
  //   return {
  //     redirect: {
  //       destination: "/auth",
  //       permanent: false,
  //     },
  //   };
  // }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2022-11-15",
  });

  const { data: prices } = await stripe.prices.list({
    active: true,
    limit: 100,
    expand: ["data.product"],
  });

  return {
    props: { prices: prices || [], purchases: [], session },
  };
};

export default PurchasesPage;
