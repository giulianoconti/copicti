import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { IsLoading } from "../../components/isLoading/IsLoading";
import { useAuth } from "../../context/authContext";
import { deletetThisUserOrder, getUserOrders } from "../../firebase/firebase";
import "./MyCart.css";

export const MyCart = () => {
  const { userInfo, loadingUser } = useAuth();
  const [order, setOrder] = useState([]);

  useEffect(() => {
    if (userInfo && !loadingUser) {
      handleGetUserOrders();
    }
  }, []);

  const handleGetUserOrders = async () => {
    if (!loadingUser && userInfo?.email) {
      const userOrders = await getUserOrders(userInfo.email);
      setOrder(userOrders);
    }
  };

  if (loadingUser || !userInfo || order.length === 0)
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
              <img className="cart-item-img" src={item.pictureDistribution} alt="item" />
              <div className="cart-item-info">
                <h2 className="cart-item-name">{item.name}</h2>
                <h2 className="cart-item-text">Distribution: {item?.distributionSelected}</h2>
                <button
                  className="cart-item-btn"
                  onClick={() => deletetThisUserOrder(userInfo.email, item.name, item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
