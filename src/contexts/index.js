import { useState, createContext, useContext, useEffect } from "react";

export const AuthContext = createContext(null);

const initialState = {
  isLogged: false,
  email: "",
};

export const AuthProvider = (props) => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) {
      setState({ isLogged: true, email });
    }
  }, []);

  const doLogin = ({ email }) => {
    localStorage.setItem("email", email);
    setState({ isLogged: true, email });
  };

  const doLogout = () => {
    localStorage.removeItem("email");
    setState({ isLogged: false, email: "" });
  };

  return (
    <AuthContext.Provider
      value={{
        state,
        doLogin,
        doLogout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const { doLogin, doLogout, state } = useContext(AuthContext) || {};
  return { doLogin, doLogout, ...state };
};
