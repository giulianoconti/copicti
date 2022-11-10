import React, { useState, useEffect } from "react";
import { IsLoading } from "../../components/isLoading/IsLoading";
import { useAuth } from "../../context/authContext";
import { deleteThisUserOrder, getUserOrders } from "../../firebase/firebase";
import "./MyCart.css";

export const MyCart = () => {
  const { userInfo, loadingUser } = useAuth();
  const [order, setOrder] = useState([]);
  const [isLoadingPage, setIsLoadingPage] = useState(true);

  useEffect(() => {
    if (userInfo && !loadingUser) {
      handleGetUserOrders();
    }
  }, [userInfo]);

  const handleGetUserOrders = async () => {
    if (!loadingUser && userInfo?.email) {
      const userOrders = await getUserOrders(userInfo.email);
      setOrder(userOrders);
      setIsLoadingPage(false);
    } else {
      setIsLoadingPage(false);
    }
  };

  const deleteItem = async (email, id, price) => {
    setIsLoadingPage(true);
    await deleteThisUserOrder(email, id, price);
    handleGetUserOrders();
  };

  if (loadingUser || !userInfo || isLoadingPage)
    return (
      <div className="cart-screen">
        <div className="cart-container">
          <IsLoading />
        </div>
      </div>
    );

  return (
    <div className="cart-screen">
      <div className="cart-container">
        <h1 className="cart-title">My Cart</h1>
        <div className="cart-items-container">
          {order?.map((item) => (
            <div className="cart-item" key={item.id}>
              <img className="cart-item-img" src={item?.pictureDistribution || item?.image} alt="item" />
              <div className="cart-item-info">
                <h2 className="cart-item-name">{item.name}</h2>
                <h2 className="cart-item-text">
                  {item?.distributionSelected ? `Distribution: ${item?.distributionSelected}` : ""}
                </h2>
                <h2 className="cart-item-text">Price: ${item?.price || "agree with the seller"}</h2>
                <button className="cart-item-btn" onClick={() => deleteItem(userInfo.email, item.id, item?.price)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
          {order.length === 0 && <p className="cart-empty">Your cart is empty</p>}
        </div>
      </div>
    </div>
  );
};
