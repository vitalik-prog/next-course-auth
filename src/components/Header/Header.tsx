import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import classes from "./css/Header.module.css";

const Header = () => {
  const { data: session } = useSession();
  return (
    <header className={classes.header}>
      <Link href="/">
        <div className={classes.logo}>Next Auth</div>
      </Link>
      <nav>
        <ul>
          {!session && (
            <li>
              <Link href="/auth">Login</Link>
            </li>
          )}
          {session && (
            <li>
              <Link href="/payments">Payments</Link>
            </li>
          )}
          {session && (
            <li>
              <button onClick={() => signOut()}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
