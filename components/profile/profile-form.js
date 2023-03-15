import { useRef } from 'react';
import classes from './profile-form.module.css';

function ProfileForm(props) {
  const newPasswordInputRef = useRef();
  const oldPasswordInputRef = useRef();

  function changePasswordHandler(event) {
    event.preventDefault();

    const enteredNewPassword = newPasswordInputRef.current.value;
    const enteredOldPassword = oldPasswordInputRef.current.value;

    const reqBody = {
      oldPassword: enteredOldPassword,
      newPassword: enteredNewPassword
    };

    props.onChangePassword(reqBody);
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

export default ProfileForm;
