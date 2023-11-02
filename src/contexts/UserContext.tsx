import {
  decodeToken,
  deleteTokenFromLocalStorage,
  getTokenFromLocalStorage,
  saveTokenOnLocalStorage,
} from "@/api/token";
import { Middleware, useEnhancedReducer } from "@/hooks/useEnhancedReducer";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface User {
  email: string;
  id: string;
}

interface UserPayload {
  token: string;
}

type AuthAction =
  | { type: "SIGN_IN"; payload: UserPayload }
  | { type: "REGISTER"; payload: UserPayload }
  | { type: "DECODED_USER"; payload: User }
  | { type: "SIGN_OUT" };

interface UserContextValue {
  user: User | null;
  dispatch: React.Dispatch<AuthAction>;
  recoveringUserSession: boolean;
}

interface UserContextProviderProps {
  children: React.ReactNode;
}

const initialUserContextValue: UserContextValue = {
  user: null,
  dispatch: () => {},
  recoveringUserSession: true,
};

export const UserContext = createContext<UserContextValue>(
  initialUserContextValue,
);

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  function userReducer(state: User | null, action: AuthAction): User | null {
    switch (action.type) {
      case "DECODED_USER":
        return {
          email: action.payload.email,
          id: action.payload.id,
        };
      case "SIGN_OUT":
        return null;
      default:
        return state;
    }
  }

  const jwtMiddleware: Middleware<User | null, AuthAction> = (
    state,
    action,
    dispatch,
  ) => {
    if (action.type === "SIGN_IN" || action.type === "REGISTER") {
      const decodedToken = decodeToken(action.payload.token);
      saveTokenOnLocalStorage(action.payload.token);
      dispatch({
        type: "DECODED_USER",
        payload: {
          email: decodedToken.email,
          id: decodedToken.id,
        },
      });
    } else if (action.type === "SIGN_OUT") {
      deleteTokenFromLocalStorage();
    }
  };

  const [user, dispatch] = useEnhancedReducer(userReducer, null, jwtMiddleware);

  const [recoveringUserSession, setRecoveringUserSession] = useState(true);

  // Attemp to recover user session from localStorage
  useEffect(() => {
    try {
      const token = getTokenFromLocalStorage();
      if (token) {
        const decodedToken = decodeToken(token);
        dispatch({
          type: "DECODED_USER",
          payload: {
            email: decodedToken.email,
            id: decodedToken.id,
          },
        });
        toast.success(`Welcome back, ${decodedToken.email}`);
      } else {
        toast.error("No active user session found");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error at recovering user session");
    } finally {
      setRecoveringUserSession(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UserContext.Provider value={{ user, dispatch, recoveringUserSession }}>
      {children}
    </UserContext.Provider>
  );
};
