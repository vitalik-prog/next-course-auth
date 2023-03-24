import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { FirestoreAdapter } from "@next-auth/firebase-adapter";
import { cert } from "firebase-admin/app"

import { verifyPassword } from '../../../helpers/auth';
import { connectToDatabase } from '../../../helpers/db';
import serviceAccount from '../../../next-auth-8685a-9e4b0c589a8a.json';

export default NextAuth({
  session: {
    jwt: true,
  },
  secret: process.env.NEXT_PUBLIC_SECRET,
  providers: [
    CredentialsProvider({
      authorize: async (credentials) => {
        const { email, password } = credentials;

        // const client = await connectToDatabase();
        // const db = client.db();

        // const user = await db.collection('users').findOne({ email });
        // if (!user) {
        //   client.close();
        //   throw new Error('No user found!');
        // }

        // const isValid = await verifyPassword(password, user.password);
        // if (!isValid) {
        //   client.close();
        //   throw new Error('Could not log you in!');
        // }

        // client.close();
        return { email: user.email };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      },
      httpOptions: {
        timeout: 40000,
      },
    }),
  ],
  // callbacks: {
  //   async signIn({ account, profile }) {
  //     if (account.provider === "google") {
  //       return profile.email_verified && profile.email.endsWith("@gmail.com")
  //     }
  //     return true // Do different verification for other providers that don't have `email_verified`
  //   },
  // },
  adapter: FirestoreAdapter({ 
    credential: cert({
      type: process.env.FIREBASE_TYPE,
      project_id: process.env.FIREBASE_PROJECT_ID,
      private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
      private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/gm, "\n"),
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      client_id: process.env.FIREBASE_CLIENT_ID,
      auth_uri: process.env.FIREBASE_AUTH_URI,
      token_uri: process.env.FIREBASE_TOKEN_URI,
      auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
      client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
    }) 
  })
});
