import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
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

export const postUserOrder = async (data) => {
  console.log("1", data);
  if (data.email) {
    console.log("2", data);
    const existingUser = await getDoc(doc(db, "users", data.email));
    if (existingUser.exists()) {
      console.log("3", data);
      await setDoc(doc(db, "users", data.email), {
        ...existingUser.data(),
        orders: [...existingUser.data().orders, data.order],
      });
      console.log("Document updated with ID: ", data.email);
    } else {
      await setDoc(doc(db, "users", data.email), {
        orders: [data.order],
      });
      console.log("Document written with ID: ", data.email);
    }
  } else {
    console.log("No email provided");
  }
};

/* save the user images in the images folder of the firebase storage */
export const postImageInStorage = async (file) => {
  /*  console.log(file) */
  if (file) {
    const storageRef = ref(storage, "images/" + file.name);
    const snapshot = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(snapshot.ref);
    console.log("File available at", url);
    return url;
  } else {
    console.log("No file provided");
  }
};

export const getUserOrders = async (email) => {
  const user = await getDoc(doc(db, "users", email));
  if (user.exists()) {
    return user.data().orders;
  } else {
    return [];
  }
};

export const deleteThisUserOrder = async (email, orderName, id) => {
  const user = await getDoc(doc(db, "users", email));
  if (user.exists()) {
    const newOrders = user.data().orders.filter((userOrder) => userOrder.name !== orderName);
    await setDoc(doc(db, "users", email), {
      orders: newOrders,
    });
    deleteThisImageOfThisOrder(id);
    console.log("Document updated with ID: ", email);
  } else {
    console.log("No such document!");
  }
};

export const deleteThisImageOfThisOrder = async (id) => {
  const imageName1 = id;
  const imageName2 = id + "_distribution";
  const imageRef1 = ref(storage, "images/" + imageName1);
  const imageRef2 = ref(storage, "images/" + imageName2);
  await deleteObject(imageRef1);
  await deleteObject(imageRef2);
};
