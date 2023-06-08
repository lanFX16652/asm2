import classes from "./HotelBooking.module.css";
import { DateRange } from "react-date-range";
import useFetchHotelDetail from "../../hooks/useFetchHotelDetail";
import { useParams } from "react-router-dom";
import useFetchListRoom from "../../hooks/useFetchListRoom";
import { useState, useEffect } from "react";
import axios from "axios";
import RoomItem from "./RoomItem/RoomItem";
import { addDays, subDays } from "date-fns";
import { useSelector } from "react-redux";

const HotelBooking = () => {
  // const [listRoomData, setListRoomData] = useState([]);
  // const [roomsBook, setRoomsBook] = useState([]);
  const params = useParams();
  const user = useSelector((state) => state.auth.login.currentUser);

  const [roomBookedData, setRoomBookedData] = useState([]);

  console.log(roomBookedData);

  const [calendar, setCalendar] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: "selection",
    },
  ]);

  const { name, description, rooms, hotelDetail } = useFetchHotelDetail(
    params.id
  );

  const handleOnChange = (ranges) => {
    const { selection } = ranges;
    setCalendar([selection]);
  };

  const transactionSubmit = () => {
    const payload = {
      user: user._id,
      hotel: hotelDetail._id,
      // room:
      // roomNumber
      // dateStart
      // dateEnd
      // price
      // payment
      // status
    };
  };
  return (
    <div className={classes["booking-form-wrapper"]}>
      <div className={classes["hotel-content-wrapper"]}>
        <div className={classes["hotel-info-left"]}>
          <h2 className={classes["hotel-info-title"]}>{name}</h2>
          <p className={classes["hotel-info_content"]}>{description}</p>
        </div>
        <div className={classes["hotel-price-right"]}>
          <h2>
            $a <span>{"(9-night)"}</span>
          </h2>
          <button className={classes.bookBtn}>Reserve or Book Now!</button>
        </div>
      </div>

      <div className={classes["container-date-reservedinfo"]}>
        <div className={classes["daterange-wrapper"]}>
          <h3>Dates</h3>
          <DateRange
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            className="date"
            minDate={new Date()}
            showSelectionPreview={true}
            onChange={handleOnChange}
            ranges={calendar}
          />
        </div>
        <div className={classes["reserveinfo-wrapper"]}>
          <h3>Reserved Info</h3>
          <div className={classes["input-wrapper"]}>
            <label>Your Full Name:</label>
            <input placeholder="Full Name"></input>
          </div>
          <div className={classes["input-wrapper"]}>
            <label>Your Email:</label>
            <input placeholder="Email"></input>
          </div>
          <div className={classes["input-wrapper"]}>
            <label>Your Phone Number:</label>
            <input placeholder="Phone Number"></input>
          </div>
          <div className={classes["input-wrapper"]}>
            <label>Your Identity Card Number:</label>
            <input placeholder="Card Number"></input>
          </div>
        </div>
      </div>

      <div className={classes["container-selectrooms"]}>
        <h3>Select Rooms</h3>
        <div className={classes["doubleroom-twinroom-wrapper"]}>
          {rooms?.map((roomId) => {
            return (
              <RoomItem
                key={roomId}
                roomId={roomId}
                roomBookedData={roomBookedData}
                setRoomBookedData={setRoomBookedData}
              />
            );
          })}
        </div>
      </div>

      <div className={classes["container-totalbill"]}>
        <div>
          <h3>Total Bill:</h3>
          <select placeholder="Select Payment Method">
            <option>Credit Card</option>
            <option>Cash</option>
          </select>
        </div>
        <button>Reserve Now</button>
      </div>
    </div>
  );
};

export default HotelBooking;
