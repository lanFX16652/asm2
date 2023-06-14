import classes from "./NewRoom.module.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const NewRoom = () => {
  const adminToken = useSelector((state) => state.auth.currentUser?.accessToken);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [maxPeople, setMaxPeople] = useState(0);
  const [roomNumbers, setRoomNumbers] = useState(0);

  const navigate = useNavigate();

  const submitRoomHandler = (e) => {
    e.preventDefault();
    axios({
      method: "POST",
      url: "http://localhost:5000/admin/room/create",
      data: {
        title,
        description,
        price: +price,
        maxPeople: +maxPeople,
        roomsNumber: +roomNumbers,
      },
      headers: {
        Authorization: `Bearer ${adminToken}`
      }
    }).then((result) => {
      if (result.status === 201) {
        navigate("/room/list");
      }
    });
  };

  return (
    <div>
      <div className={classes["input-wrapper"]}>
        <form onSubmit={submitRoomHandler}>
          <input
            className={classes["newproduct-input"]}
            type="text"
            placeholder="Add New Room"
          ></input>

          <div className={classes["input-container"]}>
            <div className={classes["row"]}>
              <div className={classes["col-md-5"]}>
                <label>Title</label>
                <input
                  placeholder="2 Bed Room"
                  onChange={(e) => setTitle(e.target.value)}
                ></input>
              </div>
              <div className={classes["col-md-5"]}>
                <label>Description</label>
                <input
                  placeholder="King size bed, 1 bathroom"
                  onChange={(e) => setDescription(e.target.value)}
                ></input>
              </div>
            </div>

            <div className={classes["row"]}>
              <div className={classes["col-md-5"]}>
                <label>Price</label>
                <input
                  type="number"
                  placeholder="100"
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                ></input>
              </div>
              <div className={classes["col-md-5"]}>
                <label>Max People</label>
                <input
                  type="number"
                  placeholder="2"
                  onChange={(e) => setMaxPeople(e.target.value)}
                ></input>
              </div>
            </div>

            <div className={classes["row"]}>
              <div className={classes["col-md-5"]}>
                <label>Rooms</label>
                <br></br>
                <textarea
                  placeholder="give comma between room numbers."
                  onChange={(e) => setRoomNumbers(e.target.value)}
                ></textarea>
              </div>
              <button type="submit">Send</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewRoom;
