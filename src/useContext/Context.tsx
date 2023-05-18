import { ReactNode, createContext, useContext, useReducer } from "react";

const apiContext = createContext<{ state: any; dispatch: any } | undefined>(
  undefined
);
export const UseApiContext = () => {
  const api = useContext(apiContext);
  console.log(api);

  if (!api) throw new Error("UseNote must be used");
  return api;
};

const initialstate = {
  userDetial: [],
};

const ApiFunction = (state: any, action: any) => {
  switch (action.type) {
    case "USER_CARD":
      return { ...state, userDetial: action.detial };
    default:
      return state;
  }
};

export const ApiCallBack = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(ApiFunction, initialstate);

  return (
    <apiContext.Provider value={{ state, dispatch }}>
      {children}
    </apiContext.Provider>
  );
};
