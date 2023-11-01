import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  id: string;
  email: string;
  iat: string;
}

export const saveTokenOnLocalStorage = (token: string) => {
  localStorage.setItem("crocantes-app-token", token);
};

export const getTokenFromLocalStorage = () => {
  return localStorage.getItem("crocantes-app-token");
};

export const deleteTokenFromLocalStorage = () => {
  localStorage.removeItem("crocantes-app-token");
};

export const decodeToken = (token: string) => {
  const decoded: DecodedToken = jwtDecode(token);
  return decoded;
};
