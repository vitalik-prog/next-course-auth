import {
  collection,
  where,
  query,
  addDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "../../../helpers/firebaseDb";
import { hashPassword } from "../../../helpers/auth";

async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    if (!email || email.trim() === "") {
      res.status(422).json({ message: "Invalid email address." });
      return;
    }

    if (!email.trim().match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      res.status(422).json({ message: "Please enter a valid email" });
      return;
    }

    if (!password || password.trim().length < 5) {
      res.status(422).json({ message: "Password should be at least 5 characters" });
      return;
    }

    try {
      const q = query(collection(db, "users"), where("email", "==", email));

      const querySnapshot = await getDocs(q);
      const users = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data().email);
      });
  
      if (users && users.length > 0) {
        res.status(422).json({ message: "User exists already!" });
        return;
      }
  
      const result = await addDoc(collection(db, "users"), {
        email,
        password: await hashPassword(password),
      });
  
      res.status(201).json({ message: "Created user!" });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
      return;
    }
  }
}

export default handler;
