import classes from "./TransactionPage.module.css";
import { useSelector } from "react-redux";
import useFetchHotelDetail from "../../hooks/useFetchHotelDetail";
import { useState, useEffect } from "react";
import axios from "axios";

const TransactionPage = () => {
  const user = useSelector((state) => state.auth.login.currentUser);

  const [userTransactions, setUserTransactions] = useState([]);
  console.log(user);
  useEffect(() => {
    axios({
      method: "GET",
      url: `http://localhost:5000/client/transaction/list/user/${user?._id}`,
    }).then((result) => {
      console.log(result);
      setUserTransactions(result.data);
    });
  }, []);

  return (
    <div className={classes["table-wraper"]}>
      <h2>Your Transactions</h2>
      <table className={classes["table-transactions"]}>
        <tr>
          <th>#</th>
          <th>Hotel</th>
          <th>Room</th>
          <th>Date</th>
          <th>Price</th>
          <th>Payment Method</th>
          <th>Status</th>
        </tr>

        {userTransactions.map((userTransaction, index) => {
          return (
            <>
              <tr>
                <td>{index + 1}</td>
                <td>{userTransaction.hotel.name}</td>
                <td>{userTransaction.roomsNumber.toString()}</td>
                <td>
                  {userTransaction.dateStart.slice(0, 10)} to{" "}
                  {userTransaction.dateEnd.slice(0, 10)}
                </td>
                <td>{userTransaction.price}</td>
                <td>{userTransaction.payment}</td>
                <td>{userTransaction.status}</td>
              </tr>
            </>
          );
        })}
      </table>
    </div>
  );
};

export default TransactionPage;
