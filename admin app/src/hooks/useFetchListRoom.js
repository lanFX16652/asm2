import {useState, useEffect} from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const useFetchListRoom = (page) => {
    const [listRoomData, setListRoomData] = useState();
    const adminToken = useSelector((state) => state.auth.currentUser?.accessToken);

    const refetch = (page) => {
        axios({
            method: "GET",
            url: "http://localhost:5000/admin/room/list",
            params: {
                page: page,
                limit: 10,
            },
            headers: {
                Authorization: `Bearer ${adminToken}`
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