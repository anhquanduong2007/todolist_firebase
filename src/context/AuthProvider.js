import React from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
export const AuthContext = React.createContext();
const AuthProvider = ({ children }) => {
  const history = useHistory();
  const [infoUserLogin,setUserInfoLogin ] = React.useState({});
  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const {displayName,photoURL,email,uid} = user;
        setUserInfoLogin({
          displayName,
          email,
          photoURL,
          uid
        })
        history.push("/");
        toast.success(`Chào mừng ${displayName} quay trở lại`);
        return;
      } 
      history.push("/login");
      // toast.error("Đăng nhập thất bại !");
    });
    return unsubscribe;
  }, [history]);
  return <AuthContext.Provider value = {{infoUserLogin}}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
