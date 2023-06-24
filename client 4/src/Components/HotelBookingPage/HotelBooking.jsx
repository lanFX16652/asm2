import classes from "./HotelBooking.module.css";
import { DateRange } from "react-date-range";
import useFetchHotelDetail from "../../hooks/useFetchHotelDetail";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import RoomItem from "./RoomItem/RoomItem";
import { addDays, subDays } from "date-fns";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createTransaction } from "../../redux/transactionSlice";

const HotelBooking = () => {
  const params = useParams();
  const user = useSelector((state) => state.auth.login.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [roomBookedData, setRoomBookedData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [payment, setPayment] = useState("");
  const [calendar, setCalendar] = useState([
    {
      startDate: undefined,
      endDate: undefined,
      key: "selection",
    },
  ]);
  const [isFormValid, setIsFormValid] = useState(true);

  const { name, description, rooms, price, hotelDetail } = useFetchHotelDetail(
    params.id
  );

  const handleOnChange = (ranges) => {
    const { selection } = ranges;
    setCalendar([selection]);
  };
  const roomArr = roomBookedData.map((item) => item.roomTypeId);
  const roomNumberArr = roomBookedData.map((item) => item.roomsNumber).flat();

  const transactionSubmit = () => {
    const payload = {
      user: user._id,
      hotel: hotelDetail._id,
      rooms: roomArr,
      roomsNumber: roomNumberArr,
      dateStart: calendar[0].startDate,
      dateEnd: calendar[0].endDate,
      price: totalPrice,
      payment: payment,
      status: "Booked",
    };

    if (
      calendar[0].startDate &&
      calendar[0].endDate &&
      roomBookedData &&
      payment
    ) {
      axios({
        method: "POST",
        url: "http://localhost:5000/client/transaction/create",
        data: payload,
      }).then((result) => {
        dispatch(createTransaction(result.data));
      });

      navigate("/transactions");
    } else {
      setIsFormValid(false);
    }
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
            ${price} <span>{"(9-night)"}</span>
          </h2>
          <button className={classes.bookBtn} onClick={transactionSubmit}>
            Reserve or Book Now!
          </button>
        </div>
      </div>

      <div className={classes["container-date-reservedinfo"]}>
        <div className={classes["daterange-wrapper"]}>
          <h3>Dates</h3>
          <br></br>
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
          <br></br>
          <div className={classes["input-wrapper"]}>
            <label>Your Full Name:</label>
            <input placeholder="Full Name" value={user?.fullName} />
          </div>
          <div className={classes["input-wrapper"]}>
            <label>Your Email:</label>
            <input placeholder="Email" value={user?.email} />
          </div>
          <div className={classes["input-wrapper"]}>
            <label>Your Phone Number:</label>
            <input placeholder="Phone Number" value={user?.phoneNumber} />
          </div>
          <div className={classes["input-wrapper"]}>
            <label>Your Identity Card Number:</label>
            <input placeholder="Card Number" />
          </div>
        </div>
      </div>

      <div className={classes["container-selectrooms"]}>
        <h3>Select Rooms</h3>
        <br></br>
        <div className={classes["doubleroom-twinroom-wrapper"]}>
          {calendar[0].startDate && calendar[0].endDate ? (
            rooms?.map((roomId) => {
              return (
                <RoomItem
                  key={roomId}
                  roomId={roomId}
                  roomBookedData={roomBookedData}
                  calendar={calendar}
                  setTotalPrice={setTotalPrice}
                  setRoomBookedData={setRoomBookedData}
                />
              );
            })
          ) : (
            <p>Please select Date</p>
          )}
        </div>
      </div>

      <div className={classes["totalbill-wrapper"]}>
        <h3>Total Bill: {totalPrice}$</h3>
        <div className={classes["container-totalbill"]}>
          {/* <h3>Total Bill: {totalPrice}$</h3> */}
          <select
            onChange={(e) => {
              setPayment(e.target.value);
            }}
          >
            <option>Select Payment Method</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Cash">Cash</option>
          </select>

          <button
            style={{ margin: "12px" }}
            className={classes.bookReserve}
            onClick={transactionSubmit}
          >
            Reserve Now
          </button>
          {!isFormValid && <p>Bạn cần nhập đủ thông tin</p>}
        </div>
      </div>
    </div>
  );
};

export default HotelBooking;
