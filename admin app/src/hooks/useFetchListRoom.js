import {useState, useEffect} from "react";
import axios from "axios";

const useFetchListRoom = (page) => {
    const [listRoomData, setListRoomData] = useState();

    const refetch = (page) => {
        axios({
            method: "GET",
            url: "http://localhost:5000/room/list",
            params: {
                page: page,
                limit: 10,
            }
        })
        .then((result) => {
            setListRoomData(result.data);
        })
    }

    useEffect(() => {
        refetch();
    }, [page]);

    return {
        listRoom: listRoomData?.data ?? [],
        currentPage: listRoomData?.page,
        totalPage: listRoomData?.totalPage,
        limit: listRoomData?.limit,
        totalRoom: listRoomData?.totalRoom,
        refetch: refetch,
    }
};

export default useFetchListRoom;