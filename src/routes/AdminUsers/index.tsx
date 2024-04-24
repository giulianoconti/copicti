import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserOrders, getUsers } from "src/firebase/firebase";
import "./styles.css";

const AdminUsers = () => {
  const { userEmail } = useParams();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [userOrders, setUserOrders] = useState([]);
  const [realUserEmail, setRealUserEmail] = useState("");

  useEffect(() => {
    if (userEmail) {
      setRealUserEmail(userEmail.replace("*", "."));
      if (realUserEmail) {
        showUserOrders();
      }
    } else {
      showUsers();
    }
  }, [userEmail, realUserEmail]);

  const showUsers = async () => {
    setUsers(await getUsers());
  };

  const showUserOrders = async () => {
    setUserOrders(await getUserOrders(realUserEmail));
  };

  const navigateToUser = (email: String) => {
    navigate(`/admin/users/${email}`);
  };

  if (userEmail && realUserEmail && userOrders)
    return (
      <div className="adminUsers-screen">
        <div className="adminUsers-container">
          <h1 className="adminUsers-title">
            <strong>Email:</strong> {realUserEmail}
          </h1>
          {userOrders?.map((order) => (
            <div className="adminUsers-user-container" key={order._id}>
              <p className="adminUsers-user-text">
                <strong>Id: </strong>
                {order._id}
              </p>
              <p className="adminUsers-user-text">
                <strong>Name: </strong>
                {order.name}
              </p>
              {order.distributionSelected && (
                <p className="adminUsers-user-text">
                  <strong>distributionSelected: </strong>
                  {order.distributionSelected}
                </p>
              )}
              {order.price && (
                <p className="adminUsers-user-text">
                  <strong>Price: $</strong>
                  {order.price}
                </p>
              )}
              {order.heightReference && (
                <p className="adminUsers-user-text">
                  <strong>heightReference: </strong>
                  {order.heightReference}%
                </p>
              )}
              {order.widthReference && (
                <p className="adminUsers-user-text">
                  <strong>widthReference: </strong>
                  {order.widthReference}%
                </p>
              )}
              <div className="adminUsers-user-img-container">
                {order.pictureDistribution && <img className="adminUsers-user-img" src={order.pictureDistribution} />}
                {order.uploadedImage && <img className="adminUsers-user-img" src={order.uploadedImage} />}
                {order.image && <img className="adminUsers-user-img" src={order.image} />}
              </div>
            </div>
          ))}
        </div>
      </div>
    );

  return (
    <div className="adminUsers-screen">
      <div className="adminUsers-container">
        <h1 className="adminUsers-title">Admin Users</h1>
        {users?.map((user, i) => (
          <button className="adminUsers-user-container" onClick={() => navigateToUser(user.email.replace(".", "*"))} key={user?.email || i}>
            <p className="adminUsers-user-text">
              <strong>Email:</strong> {user?.email}
            </p>
            <p className="adminUsers-user-text">
              <strong>Items in cart:</strong> {user?.orders?.length}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default AdminUsers;
