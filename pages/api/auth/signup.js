import { collection, where, query, addDoc, getDocs } from "firebase/firestore";
import { db } from "../../../helpers/firebaseDb";
import { hashPassword } from "../../../helpers/auth";
import validateCredentials from "../../../helpers/validation";

async function handler(req, res) {
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

      res.status(201).json({ message: "Created user!" });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
      return;
    }
  }
}

export default handler;
