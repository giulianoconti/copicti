import React, { useEffect, useState } from "react";
import { IsLoading } from "../../components/isLoading/IsLoading";
import { deleteProduct, getProducts, postProduct } from "../../firebase/firebase";
import "./AdminProducts.css";

export const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);
  const [newProduct, setNewProduct] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    image: "",
  });

  useEffect(() => {
    getProductsFromFirebase();
  }, [reload]);

  const getProductsFromFirebase = async () => {
    const productsFromFirebase = await getProducts("all");
    /* sort products */
    /*  productsFromFirebase.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    }); */
    setProducts(productsFromFirebase);
  };

  const handleInput = ({ target: { name, value } }) => {
    if (name === "id") {
      setNewProduct({
        ...newProduct,
        id: value + " " + Date.now(),
      });
    } else {
      setNewProduct({
        ...newProduct,
        [name]: value,
      });
    }
  };

  const addProduct = async () => {
    await postProduct(newProduct);
    setReload(!reload);
    setNewProduct({
      id: "",
      name: "",
      description: "",
      price: "",
      image: "",
    });
  };

  const editThisProduct = (product) => {
    console.log(product);
  };

  const deleteThisProduct = async (id) => {
    console.log(id);
    await deleteProduct(id);
    setReload(!reload);
  };

  return (
    <div className="adminProducts-screen">
      <div className="adminProducts-header">
        <h1>Products</h1>
        <div className="adminProducts-add-container">
          <div className="adminProducts-add-input">
            <label>Id: </label>
            <select name="id" onChange={handleInput}>
              <option name="id" value="AA Polyptych Large">
                AA Polyptych Large
              </option>
              <option name="id" value="AA Polyptych Medium">
                AA Polyptych Medium
              </option>
              <option name="id" value="AA Polyptych Small">
                AA Polyptych Small
              </option>
              <option name="id" value="AB Polyptych SH Large">
                AB Polyptych SH Large
              </option>
              <option name="id" value="AB Polyptych SH Medium">
                AB Polyptych SH Medium
              </option>
              <option name="id" value="AB Polyptych SH Small">
                AB Polyptych SH Small
              </option>
              <option name="id" value="AC Triptych Large">
                AC Triptych Large
              </option>
              <option name="id" value="AC Triptych Medium">
                AC Triptych Medium
              </option>
              <option name="id" value="AC Triptych Small">
                AC Triptych Small
              </option>
              <option name="id" value="AD Triptych Square Large">
                AD Triptych Square Large
              </option>
              <option name="id" value="AD Triptych Square Medium">
                AD Triptych Square Medium
              </option>
              <option name="id" value="AD Triptych Square Small">
                AD Triptych Square Small
              </option>
              <option name="id" value="AE Triptych Circle Large">
                AE Triptych Circle Large
              </option>
              <option name="id" value="AE Triptych Circle Medium">
                AE Triptych Circle Medium
              </option>
              <option name="id" value="AE Triptych Circle Small">
                AE Triptych Circle Small
              </option>
            </select>
          </div>
          <input
            className="adminProducts-add-input"
            type="text"
            placeholder="Name"
            name="name"
            value={newProduct.name}
            onChange={handleInput}
          />
          <input
            className="adminProducts-add-input"
            type="text"
            placeholder="Description"
            name="description"
            value={newProduct.description}
            onChange={handleInput}
          />
          <input
            className="adminProducts-add-input"
            type="text"
            placeholder="Price"
            name="price"
            value={newProduct.price}
            onChange={handleInput}
          />
          <input
            className="adminProducts-add-input"
            type="text"
            placeholder="Img URL"
            name="image"
            value={newProduct.image}
            onChange={handleInput}
          />
          <button className="adminProducts-product-btn bg-green" onClick={addProduct}>
            Add
          </button>
        </div>
      </div>
      <div className="adminProducts-container">
        {!products.length && <IsLoading />}
        {products.map((product) => (
          <div className="adminProducts-product" key={product.id}>
            <h2>Id: {product.id}</h2>
            <h3>Name: {product.name}</h3>
            <p className="adminProducts-product-p">Desc: {product.description}</p>
            <p className="adminProducts-product-p">Price: ${product.price}</p>
            <img className="adminProducts-product-img" src={product.image} alt={product.name} />
            <div className="adminProducts-btn-container">
              <button className="adminProducts-product-btn bg-cyan" onClick={() => editThisProduct(product.id)}>
                Edit
              </button>
              <button className="adminProducts-product-btn bg-red" onClick={() => deleteThisProduct(product.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
