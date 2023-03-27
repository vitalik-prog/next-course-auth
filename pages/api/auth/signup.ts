import type { NextApiRequest, NextApiResponse } from 'next';
import { collection, where, query, addDoc, getDocs } from "firebase/firestore";
import { db } from "../../../src/helpers/firebaseDb";
import { hashPassword } from "../../../src/helpers/auth";
import validateCredentials from "../../../src/helpers/validation";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email, password } = req.body;
    const { isValid, message } = validateCredentials(email, password);
    if (!isValid) {
      res.status(422).json({ message });
      return;
    }

    try {
      const q = query(collection(db, "users"), where("email", "==", email));

      const querySnapshot = await getDocs(q);
      const users = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data().email);
      });

      if (users.length > 0) {
        res.status(422).json({ message: "User exists already!" });
        return;
      }

      const result = await addDoc(collection(db, "users"), {
        email,
        password: await hashPassword(password),
      });

      res.status(201).json({ email, password });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
      return;
    }
  }
}

export default handler;
