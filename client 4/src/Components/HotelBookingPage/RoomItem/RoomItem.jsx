import classes from "./RoomItem.module.css";
import { useState, useEffect } from "react";
import axios from "axios";

const RoomItem = ({
  roomId,
  roomsTypeId,
  setRoomsTypeId,
  roomsNumber,
  setRoomsNumber,
}) => {
  const [roomData, setRoomData] = useState();

  console.log(roomsNumber);
  const onChooseRoom = (e, room) => {
    if (e.target.checked) {
      // ADD
      setRoomsNumber([...roomsNumber, room.roomNumber]);

      if (!roomsTypeId.includes(room._id)) {
        setRoomsTypeId([...roomsTypeId, room._id]);
      }
    } else {
      // REMOVE
      const newRoomNumber = roomsNumber.filter(
        (roomNumber) => roomNumber !== room.roomNumber
      );

      setRoomsNumber(newRoomNumber);

      if (newRoomNumber.length === 0) {
        setRoomsTypeId(
          roomsTypeId.filter((roomTypeId) => roomTypeId !== roomData._id)
        );
      }

      let needRemove = true;

      needRemove = newRoomNumber.some((roomNumber) => {
        let result = false;
        console.log(roomNumber, room.roomNumbers);
        room.roomNumbers.forEach((roomNumberChild) => {
          result = roomNumber !== roomNumberChild;
        });

        return result;
      });

      if (needRemove) {
        setRoomsTypeId(
          roomsTypeId.filter((roomTypeId) => roomTypeId !== roomData._id)
        );
      }
      // newRoomNumber.forEach((roomNumber) => {
      //   if ()

      //   if (!room.roomNumbers.includes(roomNumber)) {
      //     needRemove = true;
      //   }
      // });

      // if (needRemove) {
      //   // console.log(roomData._id);
      //   setRoomsTypeId(
      //     roomsTypeId.filter((roomTypeId) => roomTypeId !== roomData._id)
      //   );
      // }

      // let isHaveRoomNumber = (newRoomNumber.length = 0
      //   ? false
      //   : newRoomNumber.some((roomNumber) => {
      //       let result = false;
      //       roomData.roomNumbers.forEach((roomNumberChildren) => {
      //         result = roomNumber === roomNumberChildren;
      //       });

      //       return result;
      //     }));

      // if (isHaveRoomNumber)
      //   setRoomsTypeId(
      //     roomsTypeId.filter((roomTypeId) => roomTypeId !== roomData._id)
      //   );
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

    if (roomId) {
      fetchListRoom();
    }
  }, [roomId]);

  const flattenRoom = roomData?.roomNumbers?.reduce((prevData, roomNumber) => {
    return [...prevData, { ...roomData, roomNumber }];
  }, []);

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
          {flattenRoom?.map((currentRoom) => {
            return (
              <div
                key={currentRoom._id}
                className={classes["room-check-wrapper"]}
              >
                <p>{currentRoom.roomNumber}</p>
                <input
                  className={classes["rooms-input"]}
                  type="checkbox"
                  onChange={(e) => {
                    onChooseRoom(e, currentRoom);
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
