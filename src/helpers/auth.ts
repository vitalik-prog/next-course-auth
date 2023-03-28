import { hash, compare } from "bcryptjs";
import { signIn } from "next-auth/react";
import { NextRouter } from "next/router";
import HttpError from "../common/types/HttpError";
import INotification from "../common/interfaces/INotification";

export const hashPassword = async (password: string) =>
  await hash(password, 12);

export const verifyPassword = async (
  password: string,
  hashedPassword: string
) => await compare(password, hashedPassword);

export const signInUser = async (
  email: string,
  password: string,
  showNotification: (params: INotification) => void,
  router: NextRouter
) => {
  try {
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (result && !result.error) {
      showNotification({
        title: "Success!",
        message: "Logged in successfully.",
        status: "success",
      });
      router.replace("/purchases");
    }
    if (!result || result.error) {
      showNotification({
        title: "Error!",
        message: result?.error || "Something went wrong!",
        status: "error",
      });
    }
  } catch (error: unknown) {
    const err = error as HttpError;
    showNotification({
      title: "Error!",
      message: err.message || "Something went wrong!",
      status: "error",
    });
  }
};

export const createUser = async (email: string, password: string) => {
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
