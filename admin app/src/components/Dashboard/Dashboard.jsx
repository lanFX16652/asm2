import { useState, useEffect } from "react";
import classes from "./Dashboard.module.css";
import axios from "axios";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const [listTransaction, setListTransaction] = useState([]);
  const adminToken = useSelector(
    (state) => state.auth?.currentUser?.accessToken
  );

  useEffect(() => {
    const fetchListTransactionAll = () => {
      axios({
        method: "GET",
        url: "http://localhost:5000/admin/transaction/list/all",
        params: {
          limit: 8,
          page: 1,
        },
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }).then((result) => {
        console.log(result);
        setListTransaction(result.data.data);
      });
    };

    if (adminToken) {
      fetchListTransactionAll();
    }
  }, [adminToken]);

  return (
    <div className={classes["dashboard-wrapper"]}>
      <div className={classes["users-orders-earnings-balance-wrapper"]}>
        <div className={classes["users"]}>
          <h5>USERS</h5>
          <h2>100</h2>
          <div className={classes["icon-wrapper"]}>
            <i className="bi bi-file-person-fill"></i>
          </div>
        </div>
        <div className={classes["orders"]}>
          <h5>ORDERS</h5>
          <h2>100</h2>
          <div className={classes["icon-wrapper"]}>
            <i className="bi bi-cart3"></i>
          </div>
        </div>
        <div className={classes["earnings"]}>
          <h5>EARNINGS</h5>
          <h2>$ 100</h2>
          <div className={classes["icon-wrapper"]}>
            <i className="bi bi-coin"></i>
          </div>
        </div>
        <div className={classes["balance"]}>
          <h5>BALANCE</h5>
          <h2>$ 100</h2>
          <div className={classes["icon-wrapper"]}>
            <i className="bi bi-wallet2"></i>
          </div>
        </div>
      </div>

      <div>
        <table className={classes["table-transaction"]}>
          <thead>
            <tr>
              <th>
                <i className="bi bi-square"></i>
                <span> | </span>ID
              </th>
              <th>
                <span>| </span>User
              </th>
              <th>
                <span>| </span>Hotel
              </th>
              <th>
                <span>| </span>Room
              </th>
              <th>
                <span>| </span>Date
              </th>
              <th>
                <span>| </span>Price
              </th>
              <th>
                <span>| </span>Payment Method
              </th>
              <th>
                <span>| </span>Status
              </th>
            </tr>
          </thead>

          <tbody>
            {listTransaction.map((transaction) => {
              return (
                <tr key={transaction._id}>
                  <td className={classes["id-cell"]}>
                    <span className={classes["checkbox-container"]}>
                      <input type="checkbox"></input>
                      <span className="checkmark"></span>
                    </span>
                    {transaction._id}
                  </td>
                  <td>{transaction.user.username}</td>
                  <td>{transaction.hotel.name}</td>
                  <td>{transaction.roomsNumber.toString()}</td>
                  <td>
                    {transaction.dateStart.slice(0, 10)} to{" "}
                    {transaction.dateEnd.slice(0, 10)}
                  </td>
                  <td>${transaction.price}</td>
                  <td>{transaction.payment}</td>
                  <td>{transaction.status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
