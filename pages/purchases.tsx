import { GetServerSideProps } from "next";
import Stripe from "stripe";
import Purchases from "../src/pages/Purchases/Purchases";
import IPurchasesPageProps from "../src/interfaces/pages/IPurchasesPageProps";
import ProtectedRoute from "../src/hoc/ProtectedRoute";

const PurchasesPage = (props: IPurchasesPageProps) => (
  <ProtectedRoute>
    <Purchases {...props} />
  </ProtectedRoute>
);

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  // const unsubscribe = onAuthStateChanged(auth, (user) => {
  //   console.log("user!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
  //   console.log(user);
  //   if (user) {
  //   }
  // });

  // unsubscribe();

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
    props: { prices: prices || [] },
  };
};

export default PurchasesPage;
