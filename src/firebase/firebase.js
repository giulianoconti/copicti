import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

console.log(import.meta.env.VITE_APIKEY)

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket: import.meta.env.VITE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_APPID,
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export const postProducts = async (data) => {
  try {
    const docRef = await addDoc(collection(db, "products"), data);
    const numberOfProductsWithThisType = await getDocs(
      query(collection(db, "products"), where("type", "==", data.type))
    );
    await setDoc(doc(db, "products", docRef.id), {
      id: data.type + "-" + numberOfProductsWithThisType.size,
      ...data,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const getProducts = async (products_id) => {
  if (products_id === "all") {
    const productsCollection = collection(db, "products");
    const productsSnapshot = await getDocs(productsCollection);
    const productsList = productsSnapshot.docs.map((doc) => doc.data());
    return productsList;
  } else {
    const productsCollection = collection(db, "products");
    const productsSnapshot = await getDocs(productsCollection);
    const productsList = productsSnapshot.docs
      .map((doc) => doc.data())
      .filter((product) => product.type === products_id);
    return productsList;
  }
};
