import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import homeFrameFull from "../assets/homeFrameFull.webp";
import PropTypes from "prop-types";

export const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [images, setImages] = useState({
    imageUploaded: homeFrameFull,
    imageDistribution: "",
  });

  const loginWithGoogle = async () => {
    const googleProvider = new GoogleAuthProvider();
    /* signIn with a computer */
    if (window.innerWidth > 768) {
      try {
        await signInWithPopup(auth, googleProvider);
      } catch (error) {
        console.error(error);
      }
    } else {
      /* signIn with a mobile */
      try {
        await signInWithRedirect(auth, googleProvider);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const logout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUserInfo(currentUser);
      setLoadingUser(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <authContext.Provider value={{ loginWithGoogle, userInfo, logout, loadingUser, images, setImages }}>
      {children}
    </authContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};
