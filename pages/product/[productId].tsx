import Stripe from "stripe";
import ProtectedRoute from '../../src/hoc/ProtectedRoute';
import Product from "../../src/pages/Product/Product";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

const ProductPage = ({ price }) => {
  return (
  <ProtectedRoute>
    <Product price={price} />
  </ProtectedRoute>
  );
};

export const getStaticPaths = async () => {
  const { data: prices } = await stripe.prices.list({
    active: true,
    limit: 100,
    expand: ["data.product"],
  });

  const paths = prices.map((product) => ({
    params: { productId: product.id },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const price = await stripe.prices.retrieve(params.productId, {
    expand: ["product"],
  });

  return {
    props: {
      price,
    },
  };
};

export default ProductPage;
