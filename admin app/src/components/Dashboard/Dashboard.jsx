import classes from "./Dashboard.module.css";

const Dashboard = () => {
  return (
    <div className={classes["dashboard-wrapper"]}>
      <div className={classes["users-orders-earnings-balance-wrapper"]}>
        <div className={classes["users"]}>
          <h5>USERS</h5>
          <h2>100</h2>
          <i class="bi bi-file-person-fill"></i>
        </div>
        <div className={classes["orders"]}>
          <h5>ORDERS</h5>
          <h2>100</h2>
          <i class="bi bi-cart3"></i>
        </div>
        <div className={classes["earnings"]}>
          <h5>EARNINGS</h5>
          <h2>$ 100</h2>
          <i class="bi bi-coin"></i>
        </div>
        <div className={classes["balance"]}>
          <h5>BALANCE</h5>
          <h2>$ 100</h2>
          <i class="bi bi-wallet2"></i>
        </div>
      </div>

      <div>
      <table className={classes["table-hotel"]}>
            <tr>
              <th>
                <i class="bi bi-square"></i>
                <span> | </span>ID
              </th>
              <th>
                <span>| </span>Name
              </th>
              <th>
                <span>| </span>Type
              </th>
              <th>
                <span>| </span>Title
              </th>
              <th>
                <span>| </span>City
              </th>
              <th>
                <span>| </span>Action
              </th>
            </tr>

            {/* {listHotel.map((hotel) => {
              return (
                <>
                  <tr>
                    <td className={classes["id-cell"]}>
                      <span className={classes["checkbox-container"]}>
                        <input type="checkbox"></input>
                        <span class="checkmark"></span>
                      </span>
                      {hotel._id}
                    </td>
                    <td>{hotel.name}</td>
                    <td>{hotel.type}</td>
                    <td>{hotel.title}</td>
                    <td>{hotel.city}</td>
                    <td>
                      <button
                        onClick={() => {
                          axios({
                            method: "DELETE",
                            url: `http://localhost:5000/hotel/delete/${hotel._id}`,
                          }).then((result) => {
                            if (result.status === 200) {
                              refetch();
                            }
                          });
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </>
              );
            })} */}
          </table>
      </div>
    </div>
  );
};

export default Dashboard;
