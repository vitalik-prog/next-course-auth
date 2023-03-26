import { hash, compare } from "bcryptjs";
import { signIn } from "next-auth/react";

export const hashPassword = async (password) => await hash(password, 12);

export const verifyPassword = async (password, hashedPassword) =>
  await compare(password, hashedPassword);

export const signInUser = async (email, password, showNotification, router) => {
  try {
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (!result.error) {
      showNotification({
        title: "Success!",
        message: "Logged in successfully.",
        status: "success",
      });
      router.replace("/");
    }
    if (result.error) {
      showNotification({
        title: "Error!",
        message: result.error || "Something went wrong!",
        status: "error",
      });
    }
  } catch (error) {
    showNotification({
      title: "Error!",
      message: error.message || "Something went wrong!",
      status: "error",
    });
  }
};

export const createUser = async (email, password) => {
  const newUser = { email, password };
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify(newUser),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }

  return data;
};
