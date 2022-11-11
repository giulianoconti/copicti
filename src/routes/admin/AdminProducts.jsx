import React, { useEffect, useState } from "react";
import { IsLoading } from "../../components/isLoading/IsLoading";
import { deleteProduct, getProducts } from "../../firebase/firebase";
import { CreatePictureView } from "../createPictureView/CreatePictureView";
import "./AdminProducts.css";

export const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [adminReload, setAdminReload] = useState(false);
  const [adminNewProduct, setAdminNewProduct] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    image: "",
  });

  useEffect(() => {
    getProductsFromFirebase();
  }, [adminReload]);

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
      setAdminNewProduct({
        ...adminNewProduct,
        id: value + " " + 1,
      });
    } else {
      setAdminNewProduct({
        ...adminNewProduct,
        [name]: value,
      });
    }
  };

  const editThisProduct = (product) => {
    console.log(product);
  };

  const deleteThisProduct = async (id) => {
    console.log(id);
    await deleteProduct(id);
    setAdminReload(!adminReload);
  };

  return (
    <div className="adminProducts-screen">
      <h1 className="adminProducts-title">Products</h1>
      <div className="adminProducts-header">
        <div className="adminProducts-add-container">
          <input
            className="adminProducts-add-input"
            type="text"
            placeholder="Id"
            name="id"
            disabled
            value={adminNewProduct.id}
            onChange={handleInput}
          />
          <input
            className="adminProducts-add-input"
            type="text"
            placeholder="Name"
            name="name"
            value={adminNewProduct.name}
            onChange={handleInput}
          />
          <input
            className="adminProducts-add-input"
            type="text"
            placeholder="Description"
            name="description"
            value={adminNewProduct.description}
            onChange={handleInput}
          />
          <input
            className="adminProducts-add-input"
            type="text"
            placeholder="Price"
            name="price"
            value={adminNewProduct.price}
            onChange={handleInput}
          />
          <input
            className="adminProducts-add-input"
            type="text"
            placeholder="Img URL"
            name="image"
            disabled
            value={adminNewProduct.image}
            onChange={handleInput}
          />
        </div>
      </div>
      <div className="adminProducts-CreatePictureView">
        <CreatePictureView
          adminOpen={true}
          adminNewProduct={adminNewProduct}
          setAdminNewProduct={setAdminNewProduct}
          adminReload={adminReload}
          setAdminReload={setAdminReload}
        />
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
