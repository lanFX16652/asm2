import axios from "axios";
import classes from "./Hotel.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import useFetchListHotel from "../../hooks/useFetchListHotel";
import { useSelector } from "react-redux";

const Hotel = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const token = useSelector((state) => state.auth.currentUser?.accessToken);

  console.log(token);

  const { listHotel, currentPage, limit, totalPage, totalHotel, refetch } =
    useFetchListHotel(page);

  const nextPageHandler = () => {
    setPage(page + 1);
  };

  const prevPageHandler = () => {
    setPage(page - 1);
  };

  const choosePageHandler = (page) => {
    setPage(page);
  };

  return (
    <>
      <div className={classes["content-header"]}></div>
      <div>
        <div className={classes["hotellist-navbar-wrapper"]}>
          <h2 className={classes.title}>Hotel List</h2>
          <Link to="/hotel/create">
            <button>Add New</button>
          </Link>
        </div>
        <div className={classes.padding}>
          <table className={classes["table-hotel"]}>
            <thead>
              <tr>
                <th>
                  <i className="bi bi-square"></i>
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
            </thead>

            <tbody>
              {listHotel.map((hotel) => {
                return (
                  <tr key={hotel._id}>
                    <td className={classes["id-cell"]}>
                      <span className={classes["checkbox-container"]}>
                        <input type="checkbox"></input>
                        <span className="checkmark"></span>
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
                            url: `http://localhost:5000/admin/hotel/delete/${hotel._id}`,
                            headers: {
                              Authorization: `Bearer ${token}`,
                            },
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
                );
              })}
            </tbody>
          </table>
          <div className={classes["paginate-wrapper"]}>
            <div className={classes["paginate-page"]}>
              {totalHotel} hotel / page {page}
            </div>
            <div className={classes["paginate-action"]}>
              <button onClick={prevPageHandler} disabled={page === 1}>
                Trang trước
              </button>
              {Array.from(Array(totalPage).keys()).map((item) => (
                <button
                  key={item}
                  disabled={currentPage === item + 1}
                  onClick={() => choosePageHandler(item + 1)}
                >
                  {item + 1}
                </button>
              ))}

              <button
                disabled={currentPage === totalPage ?? 0}
                onClick={nextPageHandler}
              >
                Trang sau
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hotel;
