import classes from "./RoomItem.module.css";
import { useState, useEffect } from "react";
import axios from "axios";

const RoomItem = ({
  roomId,
  roomBookedData,
  setRoomBookedData,
  calendar,
  setTotalPrice,
}) => {
  console.log("calendar", calendar)
  const [roomData, setRoomData] = useState();

  const totalPriceHanlder = (roomBookedDataUpdate) => {
    const totalPrice = roomBookedDataUpdate.reduce((prevPrice, currentRoom) => {
      const msPerDay = 1000 * 60 * 60 * 24;
      const dateBooked =
        !calendar[0].startDate && !calendar[0].endDate
          ? 1
          : Math.floor(
              (calendar[0].endDate - calendar[0].startDate) / msPerDay
            );

      console.log(dateBooked, calendar);

      const totalPriceCurrentRoom =
        currentRoom.roomsNumber.length *
        currentRoom.roomData.price *
        dateBooked;

      return prevPrice + totalPriceCurrentRoom;
    }, 0);

    setTotalPrice(totalPrice);
  };

  const onChooseRoom = (e, room) => {
    if (e.target.checked) {
      // truong hop chua co roomnumber va roomTypeId & roomBookedData = []
      if (roomBookedData.length === 0) {
        const newBookedData = [
          {
            roomTypeId: roomId,
            roomsNumber: [room],
            roomData,
          },
        ];
        totalPriceHanlder(newBookedData);
        return setRoomBookedData(newBookedData);
      }
      let roomBookedUpdate = roomBookedData;

      // truong hop da ton tai roomTypeId trong roomBookedData => update roomsBooked trong object roomBookData tuong voi roomTypeId
      const indexRoomBookedExist = roomBookedUpdate.findIndex(
        (roomBooked) => roomBooked.roomTypeId === roomId
      );

      const roomBookedExist = roomBookedUpdate[indexRoomBookedExist];

      if (roomBookedExist) {
        roomBookedUpdate[indexRoomBookedExist] = {
          ...roomBookedExist,
          roomsNumber: [...roomBookedExist.roomsNumber, room],
        };
      } else {
        roomBookedUpdate = [
          ...roomBookedData,
          {
            roomTypeId: roomId,
            roomsNumber: [room],
            roomData,
          },
        ];
      }

      totalPriceHanlder(roomBookedUpdate);
      setRoomBookedData(roomBookedUpdate);
    } else {
      const updateRoomBooked = roomBookedData
        .map((roomBooked) => {
          if (roomBooked.roomTypeId === roomId) {
            return {
              ...roomBooked,
              roomsNumber: roomBooked.roomsNumber.filter(
                (roomNumber) => roomNumber !== room
              ),
            };
          }
          return roomBooked;
        })
        .map((roomBooked) => {
          if (roomBooked.roomsNumber.length === 0) {
            return undefined;
          }
          return roomBooked;
        })
        .filter(Boolean);

      totalPriceHanlder(updateRoomBooked);
      setRoomBookedData(updateRoomBooked);
    }
  };

  useEffect(() => {
    const fetchListRoom = () => {
      axios({
        method: "GET",
        url: `http://localhost:5000/client/room-number/${roomId}`,
      })
        .then((result) => {
          setRoomData(result.data);
        })
        .catch((error) => console.log(error));
    };

    fetchListRoom();
  }, [roomId]);

  useEffect(() => {
    totalPriceHanlder(roomBookedData);
  }, [calendar]);

  return (
    <div className={classes["budgetroom-wrapper"]}>
      <h4>{roomData?.title}</h4>
      <div className={classes["budgetroom-info-wrapper"]}>
        <div className={classes["left-content"]}>
          {calendar.startDate && <h4>Pay nothing until September 04, 2022</h4>}
          <p>Max people: {roomData?.maxPeople}</p>
          <h4>{roomData?.price}$</h4>
        </div>
        <div className={classes["right-content"]}>
          {roomData?.roomsNumber?.map((roomNumber) => {
            return (
              <div
                key={roomNumber._id}
                className={classes["room-check-wrapper"]}
              >
                <p>{roomNumber.number}</p>
                <input
                  className={classes["rooms-input"]}
                  type="checkbox"
                  onChange={(e) => {
                    onChooseRoom(e, roomNumber.number);
                  }}
                ></input>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RoomItem;
