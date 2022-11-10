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

export const postProduct = async (data) => {
  console.log("postProducts");
  try {
    await setDoc(doc(db, "products", data.id), data);
    console.log("Document written with ID: ", data.id);
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

export const getProducts = async (products_id) => {
  console.log("getProducts");
  if (products_id === "all") {
    const productsCollection = collection(db, "products");
    const productsSnapshot = await getDocs(productsCollection);
    const productsList = productsSnapshot.docs.map((doc) => doc.data());
    return productsList;
  } else {
    products_id = products_id.slice(0, 2);
    const productsCollection = collection(db, "products");
    const productsSnapshot = await getDocs(productsCollection);
    const productsList = productsSnapshot.docs
      .map((doc) => doc.data())
      .filter((product) => product.id.includes(products_id));
    return productsList;
  }
};

export const deleteProduct = async (id) => {
  console.log("deleteProduct");
  const docRef = doc(db, "products", id);
  await deleteDoc(docRef);
};

export const postUserOrder = async (data) => {
  console.log("postUserOrder");
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
  console.log("postImageInStorage");
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

export const postInStorageProductsImages = async (file, fileName) => {
  console.log("postInStorageProductsImages");
  if (file) {
    const storageRef = ref(storage, "productsImages/" + fileName);
    const snapshot = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(snapshot.ref);
    console.log("File available at", url);
    return url;
  } else {
    console.log("No file provided");
  }
}

export const getUserOrders = async (email) => {
  console.log("getUserOrders");
  const user = await getDoc(doc(db, "users", email));
  if (user.exists()) {
    return user.data().orders;
  } else {
    return [];
  }
};

export const deleteThisUserOrder = async (email, orderName, id, price = "") => {
  console.log("deleteThisUserOrder");
  const user = await getDoc(doc(db, "users", email));
  if (user.exists()) {
    const newOrders = user.data().orders.filter((userOrder) => userOrder.name !== orderName);
    await setDoc(doc(db, "users", email), {
      orders: newOrders,
    });
    if (!price) deleteThisImageOfThisOrder(id);
    console.log("Document updated with ID: ", email);
  } else {
    console.log("No such document!");
  }
};

export const deleteThisImageOfThisOrder = async (id) => {
  console.log("deleteThisImageOfThisOrder");
  console.log(id);
  const imageName1 = id;
  const imageName2 = id + "_distribution";
  const imageRef1 = ref(storage, "images/" + imageName1);
  const imageRef2 = ref(storage, "images/" + imageName2);
  await deleteObject(imageRef1);
  await deleteObject(imageRef2);
};
