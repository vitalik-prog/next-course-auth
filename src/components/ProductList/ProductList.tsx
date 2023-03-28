import { useRef } from 'react';
import IPaymentsForm from './interfaces/IProductList';
import classes from './css/ProductList.module.css';

const PaymentsForm: React.FC<IPaymentsForm> = () => {
  const newPasswordInputRef = useRef<HTMLInputElement | null>(null);
  const oldPasswordInputRef = useRef<HTMLInputElement | null>(null);

  function changePasswordHandler(event: React.SyntheticEvent) {
    event.preventDefault();

    const enteredNewPassword = newPasswordInputRef.current?.value;
    const enteredOldPassword = oldPasswordInputRef.current?.value;

    const reqBody = {
      oldPassword: enteredOldPassword || '',
      newPassword: enteredNewPassword || '',
    };
  };

  return (
    <form className={classes.form} onSubmit={changePasswordHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={newPasswordInputRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor='old-password'>Old Password</label>
        <input type='password' id='old-password' ref={oldPasswordInputRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default PaymentsForm;
