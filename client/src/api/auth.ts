import type { RegistrationForm } from "../types/auth";
import { api } from "./api";
import getUserByToken from "./getUserByToken";

export async function register(formData: RegistrationForm) {
  return await api.post<{ token: string }>("auth/register", formData);
}
export function login() {}

export default {
  register,
  login,
  getUserByToken,
};
