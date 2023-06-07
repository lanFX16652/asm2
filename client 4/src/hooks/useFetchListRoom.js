import { useState, useEffect } from "react";
import axios from "axios";

const useFetchListRoom = (roomId) => {
    const [listRoomData, setListRoomData] = useState();

    const refetch = (roomId) => {
        axios({
            method: "GET",
            url: "http://localhost:5000/room-number",
            params: roomId
        })
            .then((result) => {
                console.log(result);
                setListRoomData(result.data);
            })
    }

    useEffect(() => {

        refetch();

    }, [roomId]);

    return {
        title: listRoomData?.title,
        description: listRoomData?.description,
        price: listRoomData?.price,
        maxPeople: listRoomData?.maxPeople,
        roomNumbers: listRoomData?.roomNumbers,
        refetch: refetch,
    }
};

export default useFetchListRoom;