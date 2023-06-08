import classes from "./RoomItem.module.css";
import { useState, useEffect } from "react";
import axios from "axios";

const RoomItem = ({ roomId, roomBookedData, setRoomBookedData }) => {
  const [roomData, setRoomData] = useState();

  const onChooseRoom = (e, room) => {
    if (e.target.checked) {
      if (roomBookedData.length === 0) {
        const newBookedData = [
          {
            roomTypeId: roomId,
            roomsNumber: [room],
          },
        ];
        return setRoomBookedData(newBookedData);
      }

      let roomBookedUpdate = roomBookedData;

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
          },
        ];
      }

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

      setRoomBookedData(updateRoomBooked);
    }
  };

  useEffect(() => {
    const fetchListRoom = () => {
      axios({
        method: "GET",
        url: `http://localhost:5000/room-number/${roomId}`,
      })
        .then((result) => {
          setRoomData(result.data);
        })
        .catch((error) => console.log(error));
    };

    fetchListRoom();
  }, [roomId]);

  return (
    <div className={classes["budgetroom-wrapper"]}>
      <h4>{roomData?.title}</h4>
      <div className={classes["budgetroom-info-wrapper"]}>
        <div className={classes["left-content"]}>
          <h4>Pay nothing until September 04, 2022</h4>
          <p>Max people: {roomData?.maxPeople}</p>
          <h4>{roomData?.price}$</h4>
        </div>
        <div className={classes["right-content"]}>
          {roomData?.roomNumbers?.map((roomNumber) => {
            return (
              <div key={roomNumber} className={classes["room-check-wrapper"]}>
                <p>{roomNumber}</p>
                <input
                  className={classes["rooms-input"]}
                  type="checkbox"
                  onChange={(e) => {
                    onChooseRoom(e, roomNumber);
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
