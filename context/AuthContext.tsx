import {
  useEffect,
  useState,
  useContext,
  createContext,
  ReactChild,
  FC,
} from "react";
import { useRouter } from "next/router";
import { auth } from "../firebase/firebase";

interface IAuthProvider {
  children: ReactChild;
}

interface IAuthContext {
  currentUser: any;
  login: (email: string, password: string) => Promise<any>;
  logout: () => void;
}

// @ts-ignore
const AuthContext = createContext<IAuthContext>();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider: FC<IAuthProvider> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const login = (email: string, password: string) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const logout = () => {
    return auth.signOut();
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      if (user === null && router.pathname !== "/register") {
        router.push("/login");
      }

      if (
        user !== null &&
        (router.pathname === "/login" || router.pathname === "/register")
      ) {
        router.push("/");
      }

      setTimeout(() => {
        setLoading(false);
      }, 100);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    logout,
  };
  return (
    <>
      <AuthContext.Provider value={value}>
        {!loading && children}
      </AuthContext.Provider>
    </>
  );
};
