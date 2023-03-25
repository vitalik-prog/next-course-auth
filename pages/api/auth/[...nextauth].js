import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { FirestoreAdapter } from "@next-auth/firebase-adapter";
import { cert } from "firebase-admin/app";
import { collection, where, query, getDocs } from "firebase/firestore";
import { db } from "../../../helpers/firebaseDb";
import validateCredentials from "../../../helpers/validation";
import { verifyPassword } from "../../../helpers/auth";

export default NextAuth({
  session: { strategy: "jwt" },
  secret: process.env.NEXT_PUBLIC_SECRET,
  providers: [
    CredentialsProvider({
      authorize: async (credentials) => {
        const { email, password } = credentials;
        const { isValid, message } = validateCredentials(email, password);

        if (!isValid) {
          throw new Error(message);
        }

        const q = query(collection(db, "users"), where("email", "==", email));
        const querySnapshot = await getDocs(q);
        const users = [];
        querySnapshot.forEach((doc) => {
          users.push({
            email: doc.data().email,
            password: doc.data().password,
          });
        });

        if (users.length > 0) {
          const user = users.pop();
          const isPasswordValid = await verifyPassword(password, user.password);

          if (!isPasswordValid) {
            throw new Error("Password not valid");
          }

          return { email: user.email };
        } else {
          throw new Error("No user found!");
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
      httpOptions: {
        timeout: 40000,
      },
    }),
  ],
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
      auth_provider_x509_cert_url:
        process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
      client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
    }),
  }),
});
