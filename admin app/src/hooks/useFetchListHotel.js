import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const useFetchListHotel = (page) => {
  const [listHotelData, setListHotelData] = useState();
  const adminToken = useSelector((state) => state.auth.currentUser?.accessToken);

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:5000/admin/hotel/list",
      params: {
        page: page,
        limit: 10,
      },
      headers: {
        Authorization: `Bearer ${adminToken}`
      }
    }).then((result) => {
      setListHotelData(result.data);
    });
  }, [page]);

  const refetch = () => {
    axios({
      method: "GET",
      url: "http://localhost:5000/admin/hotel/list",
      params: {
        page: page,
        limit: 10,
      },
      headers: {
        Authorization: `Bearer ${adminToken}`
      }
    }).then((result) => {
      setListHotelData(result.data);
    });
  };

  return {
    listHotel: listHotelData?.data ?? [],
    currentPage: listHotelData?.page,
    limit: listHotelData?.limit,
    totalPage: listHotelData?.totalPage,
    totalHotel: listHotelData?.totalHotel,
    refetch: refetch,
  };
};

export default useFetchListHotel;
