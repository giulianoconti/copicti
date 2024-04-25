import { useEffect } from "react";
import { deleteThisUserOrder, getUserOrders } from "src/firebase/firebase";
import { useAuth } from "src/context/authContext";
import { IsLoading } from "src/components";
import "./styles.css";

const MyCart = () => {
  const { userInfo, loadingUser, order, setOrder, isLoadingOrder, setIsLoadingOrder } = useAuth();

  useEffect(() => {
    if (userInfo && !loadingUser) {
      getUserOrders(userInfo.email);
    }
  }, [userInfo]);

  const deleteItem = async (email: string, _id: number, price: string) => {
    setIsLoadingOrder(true);
    await deleteThisUserOrder(email, _id, price);
    const updatedOrders = await getUserOrders(userInfo.email);
    setOrder(updatedOrders);
    setIsLoadingOrder(false);
  };

  return (
    <div className="cart">
      <div className="cart-container">
        <h1 className="cart-title">My Cart</h1>
        <div className="cart-items-container">
          {loadingUser || !userInfo || isLoadingOrder ? (
            <IsLoading />
          ) : !!order ? (
            order?.map((item: any, i: number) => (
              <div className="cart-item" key={i}>
                <img className="cart-item-img" src={item?.pictureDistribution || item?.image} alt="item" />
                <div className="cart-item-info">
                  <h2 className="cart-item-name">{item.name}</h2>
                  <h2 className="cart-item-text">
                    {item?.distributionSelected ? `Distribution: ${item?.distributionSelected}` : `Distribution: Complete`}
                  </h2>
                  <h2 className="cart-item-text">Price: ${item?.price || "agree with the seller"}</h2>
                  <button className="cart-item-btn" onClick={() => deleteItem(userInfo.email, item._id, item?.price)}>
                    Remove
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="cart-empty">Your cart is empty</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyCart;
