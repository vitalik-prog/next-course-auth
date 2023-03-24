import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

import classes from './main-navigation.module.css';

const MainNavigation = () => {
  const { data: session } = useSession();

  return (
    <header className={classes.header}>
      <Link href='/' legacyBehavior>
        <a>
          <div className={classes.logo}>Next Auth</div>
        </a>
      </Link>
      <nav>
        <ul>
          {!session && (
            <li>
              <Link href='/auth'>Login</Link>
            </li>
          )}
          {session && (
            <li>
              <Link href='/profile'>Profile</Link>
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
}

export default MainNavigation;
