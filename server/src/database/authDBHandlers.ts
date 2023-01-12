import { db } from "./api";

export const queryUser = async (username: string) => {
  const [rows] = await (
    await db
  ).execute("SELECT * FROM users WHERE username = ?", [username]);
  return rows;
};

export const queryEmail = async (email: string) => {
  const [rows] = await (
    await db
  ).execute("SELECT * FROM users WHERE email = ?", [email]);
  return rows;
};

export const updateUserInfo = async (
  username: string,
  password: string,
  email: string
) => {
  const result = await (
    await db
  ).execute("UPDATE users SET username = ?, password = ? WHERE email = ?;", [
    username,
    password,
    email,
  ]);

  return result;
};
