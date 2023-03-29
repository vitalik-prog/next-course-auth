import { app } from "../../helpers/firebaseDb";
import { getAuth, signInWithCustomToken } from "firebase/auth";
import classes from "./css/Home.module.css";

const Home = () => {
  const auth = getAuth(app);
  console.log("55555555555555555555555555555555555555555555");
  console.log(auth);

  return (
    <section className={classes.starting}>
      <h1>Welcome on Board!</h1>
    </section>
  );
};

export default Home;
