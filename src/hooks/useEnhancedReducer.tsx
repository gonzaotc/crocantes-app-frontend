import { Reducer, Dispatch, useReducer } from "react";

export type Middleware<State, Action> = (
  state: State,
  action: Action,
  // Includes the original dispatch function, in case it's needed do dispatch from the middleware.
  dispatch: Dispatch<Action>,
) => void;

export const useEnhancedReducer = <State, Action>(
  reducer: Reducer<State, Action>,
  initialState: State,
  middleware: Middleware<State, Action>,
) => {
  const [state, originalDispatch] = useReducer(reducer, initialState);

  const dispatch: Dispatch<Action> = (action: Action) => {
    middleware(state, action, originalDispatch);
    originalDispatch(action);
  };

  return [state, dispatch] as const;
};

// Usage:

// const jwtMiddleware: Middleware = (state, action, dispatch) => {
//   if (action.type === "SIGN_IN" || action.type === "REGISTER") {
//     const decodedToken = jwtDecode(action.payload.token);
//     saveTokenOnLocalStorage(action.payload.token);
//     dispatch({ type: "DECODED_USER", payload: decodedToken });
//   }
// };

// const [user, dispatch] = useEnhancedReducer(userReducer, null, jwtMiddleware);
