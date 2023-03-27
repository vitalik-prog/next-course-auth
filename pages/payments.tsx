import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import PaymentsForm from '../src/components/PaymentsForm/PaymentsForm';

const PaymentsPage = () => <PaymentsForm />;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, res } = context;
  const session = await getSession({ req })

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default PaymentsPage;
