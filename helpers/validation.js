const validateCredentials = (email, password) => {
  if (!email || email.trim() === "") {
    return { isValid: false, message: "Invalid email address." };
  }

  if (!email.trim().match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
    return { isValid: false, message: "Please enter a valid email" };
  }

  if (!password || password.trim().length < 5) {
    return {
      isValid: false,
      message: "Password should be at least 5 characters",
    };
  }

  return { isValid: true };
};

export default validateCredentials;
