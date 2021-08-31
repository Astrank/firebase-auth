import { useState, useContext, useEffect, createContext } from "react";
import { initializeApp, getApps } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const prod = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

if (!getApps().length) {
  initializeApp(prod);
}

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const auth = useAuthProvider();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

function useAuthProvider() {
  const [user, setUser] = useState(null);

  const auth = getAuth();

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password).then((res) => {
      setUser(res.user);
      return res.user;
    });
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password).then((res) => {
      setUser(res.user);
      return res.user;
    });
  };

  const logout = () => {
    return signOut(auth).then(() => {
      setUser(false);
    });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return {
    user,
    login,
    signup,
    logout,
  };
}
