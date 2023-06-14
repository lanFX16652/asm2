import classes from "./Transaction.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Transaction = () => {
  const adminToken = useSelector(
    (state) => state.auth.currentUser?.accessToken
  );

  const [page, setPage] = useState(1);
  const [listTransaction, setListTransaction] = useState([]);

  const nextPageHandler = () => {
    setPage(page + 1);
  };

  const prevPageHandler = () => {
    setPage(page - 1);
  };

  const choosePageHandler = (page) => {
    setPage(page);
  };

  useEffect(() => {
    const fetchListTransactionAll = () => {
      axios({
        method: "GET",
        url: "http://localhost:5000/admin/transaction/list/all",
        params: {
          limit: 8,
          page: page,
        },
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }).then((result) => {
        console.log(result);
        setListTransaction(result.data);
      });
    };
    fetchListTransactionAll();
  }, [page]);

  return (
    <div className={classes["dashboard-wrapper"]}>
      <h1>Transaction List</h1>

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
            {listTransaction?.data?.map((transaction) => {
              console.log(transaction._id);
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

        <div className={classes["paginate-wrapper"]}>
          <div className={classes["paginate-page"]}>
            {listTransaction.totalTransaction} transaction / page {page}
          </div>
          <div className={classes["paginate-action"]}>
            <button onClick={prevPageHandler} disabled={page === 1}>
              Trang trước
            </button>
            {Array.from(Array(listTransaction.totalPage).keys()).map((item) => (
              <button
                key={item}
                disabled={listTransaction.page === item + 1}
                onClick={() => choosePageHandler(item + 1)}
              >
                {item + 1}
              </button>
            ))}

            <button
              disabled={listTransaction.page === listTransaction.totalPage ?? 0}
              onClick={nextPageHandler}
            >
              Trang sau
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
