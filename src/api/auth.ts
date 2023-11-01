import { apiClient } from "./axios";

interface SignInResponse {
  token: string;
}

interface RegisterResponse {
  token: string;
}

class AuthApi {
  signIn = async (email: string, password: string): Promise<SignInResponse> => {
    const { data } = await apiClient.post("/auth/signin", { email, password });
    return data;
  };

  register = async (
    email: string,
    password: string,
  ): Promise<RegisterResponse> => {
    const { data } = await apiClient.post("/auth/register", {
      email,
      password,
    });
    return data;
  };
}

export const authApi = new AuthApi();
