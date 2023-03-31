import Link from "next/link";
import { useAuth } from "../../context/Auth/AuthContext";
import classes from "./css/Header.module.css";

const Header = () => {
  const { user, logOut } = useAuth();

  return (
    <header className={classes.header}>
      <Link href="/">
        <div className={classes.logo}>Next Auth</div>
      </Link>
      <nav>
        <ul>
          {!user.email && (
            <li>
              <Link href="/auth">Login</Link>
            </li>
          )}
          {user.email && (
            <li>
              <Link href="/purchases">Purchases</Link>
            </li>
          )}
          {user.email && (
            <li>
              <button onClick={logOut}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
