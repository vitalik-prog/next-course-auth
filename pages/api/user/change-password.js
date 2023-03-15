import { getSession } from 'next-auth/client';
import { hashPassword, verifyPassword } from '../../../helpers/auth';
import { connectToDatabase } from '../../../helpers/db';

async function handler (req, res) {
  if (req.method === 'PATCH') {
    const session = await getSession({ req });
    if (!session) {
      res.status(401).json({ message: 'Not authenticated!' });
      return;
    }

    const userEmail = session.user.email;
    const { oldPassword, newPassword } = req.body;

    if(!oldPassword || !newPassword || oldPassword.trim().length < 7 || newPassword.trim().length < 7) {
      res.status(422).json({ message: 'Invalid password.' });
      return;
    }

    const client = await connectToDatabase();
    const db = client.db();

    const user = await db.collection('users').findOne({ email: userEmail });
    if (!user) {
      client.close();
      res.status(404).json({ message: 'User not found.' });
      return;
    }

    const isValid = await verifyPassword(oldPassword, user.password);
    if (!isValid) {
      client.close();
      res.status(403).json({ message: 'Invalid old password.' });
      return;
    }

    const hashedNewPassword = await hashPassword(newPassword);

    const updatedUser = await db.collection('users').updateOne(
      { email: userEmail }, 
      { $set: { password: hashedNewPassword } 
    });
    client.close();

    res.status(200).json({ message: 'Password updated!' });
  }
}

export default handler;
