import classes from "./NewHotel.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const NewHotel = () => {
  const adminToken = useSelector((state) => state.auth.currentUser?.accessToken);

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [distance, setDistance] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [featured, setFeatured] = useState("");
  const [rooms, setRoom] = useState([]);

  const [listRoom, setListRoom] = useState([]);
  console.log(featured);

  console.log(rooms);

  const submitHandler = (e) => {
    e.preventDefault();
    axios({
      method: "POST",
      url: "http://localhost:5000/admin/hotel/create",
      data: {
        name,
        type,
        city,
        address,
        distance,
        description,
        price,
        featured,
        rooms,
      },
      headers: {
        Authorization: `Bearer ${adminToken}`
      }
    });
  };

  useEffect(() => {
    const fetchListRoom = () => {
      axios({
        method: "GET",
        url: "http://localhost:5000/admin/room/list",
        params: {
          page: 1,
          limit: 10,
        },
        headers: {
          Authorization: `Bearer ${adminToken}`
        }
      }).then((result) => {
        setListRoom(result.data.data);
      });
    };

    fetchListRoom();
  }, []);

  return (
    <div>
      <div className={classes["input-wrapper"]}>
        <form onSubmit={submitHandler}>
          <input
            className={classes["newproduct-input"]}
            type="text"
            placeholder="Add New Product"
          ></input>

          <div className={classes["input-container"]}>
            <div className={classes["row"]}>
              <div className={classes["col-md-5"]}>
                <label>Name</label>
                <input
                  placeholder="My Hotel"
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </div>
              <div className={classes["col-md-5"]}>
                <label>Type</label>
                <input
                  placeholder="hotel"
                  onChange={(e) => setType(e.target.value)}
                ></input>
              </div>
            </div>

            <div className={classes["row"]}>
              <div className={classes["col-md-5"]}>
                <label>City</label>
                <input
                  placeholder="New York"
                  onChange={(e) => setCity(e.target.value)}
                ></input>
              </div>
              <div className={classes["col-md-5"]}>
                <label>Address</label>
                <input
                  placeholder="elton st, 216"
                  onChange={(e) => setAddress(e.target.value)}
                ></input>
              </div>
            </div>

            <div className={classes["row"]}>
              <div className={classes["col-md-5"]}>
                <label>Distance from City Center</label>
                <input
                  placeholder="500"
                  onChange={(e) => setDistance(e.target.value)}
                ></input>
              </div>
              <div className={classes["col-md-5"]}>
                <label>Price</label>
                <input
                  type="number"
                  placeholder="100"
                  onChange={(e) => setPrice(e.target.value)}
                ></input>
              </div>
            </div>

            <div className={classes["row"]}>
              <div className={classes["col-md-5"]}>
                <label>Description</label>
                <input
                  placeholder="description"
                  onChange={(e) => setDescription(e.target.value)}
                ></input>
              </div>

              <div className={classes["col-md-5"]}>
                <label>Images</label>
                <input placeholder="New York"></input>
              </div>
            </div>

            <div className={classes["row"]}>
              <div className={`${classes["col-md-5"]} ${classes["scroll-div"]}`}>
                <label>Rooms</label>
                <br></br>
                {listRoom?.map((room) => {
                  return (
                    <div className={classes['room-wrapper']}>
                      <label>{room.title}</label>
                      <input
                        className={classes['room-input']}
                        type="checkbox"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setRoom([...rooms, room._id]);
                          } else {
                            setRoom(
                              rooms?.filter(
                                (thisRoom) => rooms._id !== thisRoom._id
                              )
                            );
                          }
                        }}
                      />
                    
                    </div>
                  );
                })}
              </div>

              <div className={classes["col-md-5"]}>
                <label>Featured</label>
                <br></br>
                <select
                  onChange={(e) => {
                    console.log(e.target.value);
                    setFeatured(e.target.value);
                  }}
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
            </div>

            <button type="submit">Send</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewHotel;
