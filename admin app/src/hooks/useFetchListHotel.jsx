import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

const useFetchListHotel = (page) => {
  const [listHotelData, setListHotelData] = useState();

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:5000/hotel/list",
      params: {
        page: page,
        limit: 10,
      },
    }).then((result) => {
      setListHotelData(result.data);
    });
  }, [page]);

  const refetch = () => {
    axios({
      method: "GET",
      url: "http://localhost:5000/hotel/list",
      params: {
        page: page,
        limit: 10,
      },
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
