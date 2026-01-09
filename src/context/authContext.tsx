import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { auth, getUserOrders } from "src/firebase/firebase";
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signInWithRedirect, User } from "firebase/auth";
import homeFrameFull from "src/assets/createPaintingBg.jpg";

// ============================================
// Types
// ============================================

export interface ImageState {
  height: string;
  imageDistribution: string;
  imageUploaded: string;
  name: string;
  top?: string;
  width: string;
}

export interface OrderItem {
  _id: string;
  name: string;
  price: number;
  image: string;
  [key: string]: unknown;
}

interface AuthContextType {
  loginWithGoogle: () => Promise<void>;
  userInfo: User | null;
  logout: () => Promise<void>;
  loadingUser: boolean;
  images: ImageState;
  setImages: (images: ImageState) => void;
  order: OrderItem[];
  setOrder: (order: OrderItem[]) => void;
  isLoadingOrder: boolean;
  setIsLoadingOrder: (isLoadingOrder: boolean) => void;
}

// ============================================
// Context
// ============================================

const defaultImageState: ImageState = {
  imageDistribution: "",
  imageUploaded: homeFrameFull,
  name: "",
  height: "",
  width: "",
};

export const authContext = createContext<AuthContextType>({
  loginWithGoogle: async () => {},
  userInfo: null,
  logout: async () => {},
  loadingUser: true,
  images: defaultImageState,
  setImages: () => {},
  order: [],
  setOrder: () => {},
  isLoadingOrder: true,
  setIsLoadingOrder: () => {},
});

export const useAuth = (): AuthContextType => {
  const context = useContext(authContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

// ============================================
// Provider
// ============================================

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [order, setOrder] = useState<OrderItem[]>([]);
  const [isLoadingOrder, setIsLoadingOrder] = useState(true);
  const [images, setImages] = useState<ImageState>(defaultImageState);

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
