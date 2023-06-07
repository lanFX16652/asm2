import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useFetchHotelDetail = (hotelId) => {
    const [hotelDetail, setHotelDetail] = useState(undefined);
    const navigate = useNavigate();

    const fetchHotelDetail = () => {

        axios({
            method: "GET",
            url: `http://localhost:5000/hotel/${hotelId}`
        })
            .then((result) => {
                console.log(result);
                setHotelDetail(result.data);
            })
    };

    useEffect(() => {
        fetchHotelDetail();
    }, [hotelId])

    return {
        name: hotelDetail?.name,
        type: hotelDetail?.type,
        city: hotelDetail?.city,
        address: hotelDetail?.address,
        distance: hotelDetail?.distance,
        photos: hotelDetail?.photos,
        description: hotelDetail?.description,
        price: hotelDetail?.price,
        rating: hotelDetail?.rating,
        featured: hotelDetail?.featured,
        rooms: hotelDetail?.rooms,
        fetchHotelDetail: fetchHotelDetail,
        hotelDetail
    }
};

export default useFetchHotelDetail;