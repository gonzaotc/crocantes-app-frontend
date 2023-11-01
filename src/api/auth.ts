import { apiClient } from "./axios";

class AuthApi {
  signIn = async (email: string, password: string) => {
    const { data } = await apiClient.post("/auth/signin", { email, password });
    return data;
  };

  register = async (email: string, password: string) => {
    const { data } = await apiClient.post("/auth/register", {
      email,
      password,
    });
    return data;
  };
}

export const authApi = new AuthApi();
