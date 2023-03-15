import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { verifyPassword } from '../../../helpers/auth';
import { connectToDatabase } from '../../../helpers/db';

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      authorize: async (credentials) => {
        const { email, password } = credentials;
        const client = await connectToDatabase();
        const db = client.db();

        const user = await db.collection('users').findOne({ email });
        if (!user) {
          client.close();
          throw new Error('No user found!');
        }

        const isValid = await verifyPassword(password, user.password);
        if (!isValid) {
          client.close();
          throw new Error('Could not log you in!');
        }

        client.close();
        return { email: user.email };
      },
    }),
  ],
});
