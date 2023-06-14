import classes from "./Room.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import useFetchListRoom from "../../hooks/useFetchListRoom";

const Room = () => {
  const [roomList, setRoomList] = useState([]);
  const [page, setPage] = useState(1);
  const { listRoom, currentPage, totalPage, limit, totalRoom, refetch } =
    useFetchListRoom(page);

  const nextPageHandler = () => {
    setPage(page + 1);
  };

  const prevPageHandler = () => {
    setPage(page - 1);
  };

  const choosePageHandler = (page) => {
    setPage(page);
  };

  // const fetchRoomList = () => {
  //   axios({
  //     method: "GET",
  //     url: "http://localhost:5000/room/list",
  //     params: {
  //       page: 1,
  //       limit: 10,
  //     },
  //   }).then((result) => {
  //     // console.log(result);
  //     setRoomList(result.data.data);
  //   });
  // };

  // useEffect(() => {
  //   fetchRoomList();
  // }, []);

  return (
    <>
      <div className={classes["content-header"]}></div>
      <div>
        <div className={classes["hotellist-navbar-wrapper"]}>
          <h2 className={classes.title}>Hotel List</h2>
          <Link to="/room/create">
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
                  <span>| </span>Title
                </th>
                <th>
                  <span>| </span>Description
                </th>
                <th>
                  <span>| </span>Price
                </th>
                <th>
                  <span>| </span>Max People
                </th>
                <th>
                  <span>| </span>Action
                </th>
              </tr>
            </thead>

            <tbody>
              {listRoom.map((room) => {
                return (
                  
                    <tr key={room._id}>
                      <td className={classes["id-cell"]}>
                        <span className={classes["checkbox-container"]}>
                          <input type="checkbox"></input>
                          <span className="checkmark"></span>
                        </span>
                        {room._id}
                      </td>
                      <td>{room.title}</td>
                      <td>{room.description}</td>
                      <td>{room.price}</td>
                      <td>{room.maxPeople}</td>
                      <td>
                        <button
                          onClick={() => {
                            axios({
                              method: "DELETE",
                              url: `http://localhost:5000/room/delete/${room._id}`,
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
              {totalRoom} room / page {page}
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

export default Room;
