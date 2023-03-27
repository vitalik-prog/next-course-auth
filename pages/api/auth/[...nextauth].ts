import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import { FirestoreAdapter } from "@next-auth/firebase-adapter";
import { cert, ServiceAccount } from "firebase-admin/app";
import { collection, where, query, getDocs } from "firebase/firestore";
import { db } from "../../../src/helpers/firebaseDb";
import validateCredentials from "../../../src/helpers/validation";
import { verifyPassword } from "../../../src/helpers/auth";

export default NextAuth({
  session: { strategy: "jwt" },
  secret: process.env.NEXT_PUBLIC_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const { isValid, message } = validateCredentials(email, password);

        if (!isValid) {
          throw new Error(message);
        }

        const q = query(collection(db, "users"), where("email", "==", email));
        const querySnapshot = await getDocs(q);
        const users: { id: string; email: string; password: string }[] = [];
        querySnapshot.forEach((doc) => {
          users.push({
            id: doc.id,
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

          return { id: user.id, email: user.email };
        } else {
          throw new Error("No user found!");
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
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
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET
    })
  ],
  adapter: FirestoreAdapter({
    credential: cert({
      type: process.env.FIREBASE_TYPE,
      project_id: process.env.FIREBASE_PROJECT_ID,
      private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
      private_key:
        process.env.FIREBASE_PRIVATE_KEY &&
        process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/gm, "\n"),
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      client_id: process.env.FIREBASE_CLIENT_ID,
      auth_uri: process.env.FIREBASE_AUTH_URI,
      token_uri: process.env.FIREBASE_TOKEN_URI,
      auth_provider_x509_cert_url:
        process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
      client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
    } as ServiceAccount),
  }),
});
