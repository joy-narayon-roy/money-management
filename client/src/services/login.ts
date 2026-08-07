import axios from "axios";

export type LoginPayload = {
  email: string;
  password: string;
};
async function login(info: LoginPayload): Promise<string> {
  try {
    const { data = { token: "" } } = await axios.post("/api/auth/login", info);
    return data?.token;
  } catch (err) {
    console.log("failed to login");
    console.log(err);
    const new_err = new Error("failed to login");
    throw new_err;
  }
  return "";
}

export default login;
