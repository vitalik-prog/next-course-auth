import { hashPassword } from "../../../helpers/auth";
import { connectToDatabase } from "../../../helpers/db";

async function handler (req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    if (!email || !email.includes("@") || !password || password.trim().length < 7) {
      res.status(422).json({ message: "Invalid input - password should be at least 7 characters long." });
      return;
    }

    const client = await connectToDatabase();
    const db = client.db();

    const isUserExist = await db.collection('users').findOne({ email });
    if (isUserExist) {
      res.status(422).json({ message: "User exists already!" });
      client.close();
      return;
    }

    const hashedPassword = await hashPassword(password);

    const result = await db.collection("users").insertOne({ email, password: hashedPassword });

    res.status(201).json({ message: "Created user!" });
    client.close();
  }
}

export default handler;
