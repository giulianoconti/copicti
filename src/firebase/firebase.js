import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { getFirestore, collection, getDocs, doc, getDoc, where, setDoc, deleteDoc } from "firebase/firestore";

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
  if (data) {
    let numberOfItemsThatIncludeThisId = "";
    const lastItemWithIncludeId = await getDocs(collection(db, "products"), where("id", ">=", data.id));
    const lastItem = lastItemWithIncludeId.docs[lastItemWithIncludeId.docs.length - 1];
    if (lastItem) {
      numberOfItemsThatIncludeThisId = lastItemWithIncludeId.docs.filter((item) => item.data().id.includes(data.id)).length;
    }
    try {
      data.id = data.id + " " + numberOfItemsThatIncludeThisId;
      await setDoc(doc(db, "products", data.id), data);
    } catch (error) {
      console.log("Error adding document: ", error);
    }
  }
};

export const getProducts = async (products_id) => {
  if (products_id === "all") {
    const productsCollection = collection(db, "products");
    const productsSnapshot = await getDocs(productsCollection);
    const productsList = productsSnapshot.docs.map((doc) => doc.data());
    return productsList;
  } else {
    products_id = products_id.slice(0, 2);
    const productsCollection = collection(db, "products");
    const productsSnapshot = await getDocs(productsCollection);
    const productsList = productsSnapshot.docs.map((doc) => doc.data()).filter((product) => product.id.includes(products_id));
    return productsList;
  }
};

export const deleteProduct = async (id) => {
  const docRef = doc(db, "products", id);
  await deleteDoc(docRef);
};

export const postUserOrder = async (data) => {
  if (data.email) {
    const existingUser = await getDoc(doc(db, "users", data.email));
    if (existingUser.exists()) {
      await setDoc(doc(db, "users", data.email), {
        ...existingUser.data(),
        orders: [...existingUser.data().orders, data.order],
      });
    } else {
      await setDoc(doc(db, "users", data.email), {
        email: data.email,
        orders: [data.order],
      });
    }
  } else {
    console.log("No email provided");
  }
};

/* save the user images in the images folder of the firebase storage */
export const postImageInStorage = async (file) => {
  if (file) {
    const storageRef = ref(storage, "images/" + file.name);
    const snapshot = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(snapshot.ref);
    return url;
  } else {
    console.log("No file provided");
  }
};

export const postInStorageProductsImages = async (file, fileId) => {
  if (file && fileId) {
    let numberOfItemsThatIncludeThisId = "";
    const lastItemWithIncludeId = await getDocs(collection(db, "products"), where("id", ">=", fileId));
    const lastItem = lastItemWithIncludeId.docs[lastItemWithIncludeId.docs.length - 1];
    if (lastItem) {
      numberOfItemsThatIncludeThisId = lastItemWithIncludeId.docs.filter((item) => item.data().id.includes(fileId)).length;
    }
    const storageRef = ref(storage, "productsImages/" + fileId + " " + numberOfItemsThatIncludeThisId + " " + ".webp");
    const snapshot = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(snapshot.ref);
    return url;
  } else {
    console.log("No file provided or fileId");
  }
};

export const getUsers = async () => {
  const usersCollection = collection(db, "users");
  const usersSnapshot = await getDocs(usersCollection);
  const usersList = usersSnapshot.docs.map((doc) => doc.data());
  return usersList;
};

export const getUserOrders = async (email) => {
  const user = await getDoc(doc(db, "users", email));
  if (user.exists()) {
    return user.data().orders;
  } else {
    return [];
  }
};

export const deleteThisUserOrder = async (email, _id, price = "") => {
  const user = await getDoc(doc(db, "users", email));
  if (user.exists()) {
    const newOrders = user.data().orders.filter((userOrder) => userOrder._id !== _id);
    await setDoc(doc(db, "users", email), {
      orders: newOrders,
    });
    if (!price) deleteThisImageOfThisOrder(_id);
  } else {
    console.log("No such document!");
  }
};

export const deleteThisImageOfThisOrder = async (_id) => {
  const imageName1 = _id;
  const imageName2 = _id + "_distribution";
  const imageRef1 = ref(storage, "images/" + imageName1);
  const imageRef2 = ref(storage, "images/" + imageName2);
  await deleteObject(imageRef1);
  await deleteObject(imageRef2);
};
