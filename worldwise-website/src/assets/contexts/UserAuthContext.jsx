import { createContext, useContext, useReducer } from "react";

const UseAuth = createContext();

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};
const initialState = {
  user: null,
  isAuthenticated: false,
};

function reducerfn(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case "logout":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    default:
      throw new Error("Unknown Action");
  }
}
function UseAuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducerfn,
    initialState
  );

  function login(email, password) {
    if (FAKE_USER.email === email && FAKE_USER.password === password) {
      dispatch({ type: "login", payload: FAKE_USER });
    }
  }
  function logout() {
    dispatch({ type: "logout" });
  }
  return (
    <UseAuth.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </UseAuth.Provider>
  );
}

function useAuth() {
  const context = useContext(UseAuth);
  if (context === undefined) {
    throw new Error("Context used outside its provider");
  }
  return context;
}

export { UseAuthProvider, useAuth };
