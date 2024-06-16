import { createContext, useContext, useEffect, useState } from "react";
import { auth, getUserOrders } from "src/firebase/firebase";
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import homeFrameFull from "src/assets/createPaintingBg.jpg";

interface Auth {
  loginWithGoogle: () => void;
  userInfo: {
    uid: string;
    email: string;
    emailVerified: boolean;
    displayName: string;
    isAnonymous: boolean;
    photoURL: string;
    providerData: [
      {
        providerId: string;
        uid: string;
        displayName: string;
        email: string;
        phoneNumber: null;
        photoURL: string;
      }
    ];
    stsTokenManager: {
      refreshToken: string;
      accessToken: string;
      expirationTime: number;
    };
    createdAt: string;
    lastLoginAt: string;
    apiKey: string;
    appName: string;
  };
  logout: () => void;
  loadingUser: boolean;
  images: {
    height: string;
    imageDistribution: string;
    imageUploaded: string;
    name: string;
    top?: string;
    width: string;
  };
  setImages: (images: any) => void;
  order: any;
  setOrder: (order: any) => void;
  isLoadingOrder: boolean;
  setIsLoadingOrder: (isLoadingOrder: boolean) => void;
}

export const authContext = createContext<Auth>({
  loginWithGoogle: () => {},
  userInfo: null,
  logout: () => {},
  loadingUser: true,
  images: {
    imageDistribution: "",
    imageUploaded: homeFrameFull,
    name: "",
    height: "",
    width: "",
  },
  setImages: () => {},
  order: [],
  setOrder: () => {},
  isLoadingOrder: true,
  setIsLoadingOrder: () => {},
});

export const useAuth = (): Auth => {
  const context = useContext(authContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export const AuthProvider = ({ children }: { children: any }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [order, setOrder] = useState([]);
  const [isLoadingOrder, setIsLoadingOrder] = useState(true);
  const [images, setImages] = useState({
    imageDistribution: "",
    imageUploaded: homeFrameFull,
    name: "",
    height: "",
    width: "",
  });

  const loginWithGoogle = async () => {
    const googleProvider = new GoogleAuthProvider();
    // signIn with a computer
    if (window.innerWidth > 768) {
      try {
        await signInWithPopup(auth, googleProvider);
      } catch (error) {
        console.error(error);
      }
    } else {
      // signIn with a mobile
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
    if (userInfo && !loadingUser) {
      handleGetUserOrders();
    }
  }, [userInfo]);

  const handleGetUserOrders = async () => {
    if (!loadingUser && userInfo?.email) {
      const userOrders = await getUserOrders(userInfo.email);
      setOrder(userOrders);
      setIsLoadingOrder(false);
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
    <authContext.Provider
      value={{ loginWithGoogle, userInfo, logout, loadingUser, images, setImages, order, setOrder, isLoadingOrder, setIsLoadingOrder }}
    >
      {children}
    </authContext.Provider>
  );
};
