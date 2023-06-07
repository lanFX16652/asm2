import classes from "./TransactionPage.module.css";

const TransactionPage = () => {
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
        {/* 
        {listHotel.map((hotel) => {
          return (
            <> */}
        <tr>
          <td>a</td>
          <td>a</td>
          <td>a</td>
          <td>a</td>
          <td>a</td>
          <td>a</td>
          <td>a</td>
        </tr>
        <tr>
          <td>a</td>
          <td>a</td>
          <td>a</td>
          <td>a</td>
          <td>a</td>
          <td>a</td>
          <td>a</td>
        </tr>
        {/* </> */}
        {/* );
        })} */}
      </table>
    </div>
  );
};

export default TransactionPage;
