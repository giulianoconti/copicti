import { useEffect, useState } from "react";
import { IsLoading } from "src/components";
import "./styles.css";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [adminNewProduct, setAdminNewProduct] = useState({
    _id: 99,
    name: "",
    description: "",
    price: 0,
    date: new Date(),
    image: "",
    categories: [""],
  });

  const getProducts = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/paintings?limit=999`);
      const data = await response.json();
      setProducts(data.paintings);
      setAdminNewProduct({
        ...adminNewProduct,
        _id: data.paintings.length + 1,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleInput = ({ target: { name, value } }: any) => {
    if (name === "_id") {
      return;
    } else {
      setAdminNewProduct({
        ...adminNewProduct,
        [name]: value,
      });
    }
  };

  const editThisProduct = (product: any) => {
    console.log(product);
  };

  const deleteThisProduct = async (_id: number) => {
    console.log(_id);
    confirm("Are you sure you want to delete this product?");
  };

  return (
    <div className="adminProducts">
      <div className="adminProducts-header">
        <h1 className="adminProducts-title">Products</h1>

        <div className="adminProducts-add-container">
          <input
            className="adminProducts-add-input"
            type="text"
            placeholder="_id"
            name="_id"
            disabled
            value={adminNewProduct._id}
            onChange={handleInput}
          />

          <input className="adminProducts-add-input" type="text" placeholder="Name" name="name" value={adminNewProduct.name} onChange={handleInput} />

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
            value={!!adminNewProduct.price ? adminNewProduct.price : ""}
            onChange={handleInput}
          />

          <input
            className="adminProducts-add-input"
            type="text"
            placeholder="Image URL"
            name="image"
            value={adminNewProduct.image}
            onChange={handleInput}
          />
        </div>
      </div>

      <div className="adminProducts-container">
        {!products.length && <IsLoading />}
        {products?.map((product) => (
          <div className="adminProducts-product" key={product._id}>
            <h2>ID: {product._id}</h2>
            <h3>Name: {product.name}</h3>
            <p className="adminProducts-product-p">Desc: {product.description}</p>
            <p className="adminProducts-product-p">Price: ${product.price}</p>
            <img className="adminProducts-product-img" src={product.image} alt={product.name} />
            <div className="adminProducts-btn-container">
              <button className="adminProducts-product-btn bg-cyan" onClick={() => editThisProduct(product._id)}>
                Edit
              </button>
              <button className="adminProducts-product-btn bg-red" onClick={() => deleteThisProduct(product._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProducts;
