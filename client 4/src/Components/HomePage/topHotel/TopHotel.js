import "./TopHotel.css";
import useFetchHotelDetail from "../../../hooks/useFetchHotelDetail";
import { Link } from "react-router-dom";

//Render Hotel on HomePage page
//Parent Component
function TopHotel(props) {
  const {
    name,
    type,
    city,
    address,
    distance,
    photos,
    description,
    price,
    rating,
    featured,
    rooms,
    fetchHotelDetail,
  } = useFetchHotelDetail();
  return (
    <div>
      <h2 className="hotel-title">Homes guests love</h2>
      <div className="hotel-container">
        {props.hotels.map((hotel, index) => {
          if (index > 2) {
            return <></>
          }
          return (
            <div className="hotel-wrap">
              <img src={process.env.PUBLIC_URL + '/images/hotel_search_1.webp'} />
              <Link to={`/hotel-detail/${hotel?._id}`}>
                <h4 className="hotel-content">{hotel?.name}</h4>
              </Link>

              <h4 className="hotel-content">{hotel?.city}</h4>
              <h4 className="hotel-content">Starting from {hotel?.price}$</h4>
              <div className="hotel-rate">
                <span className="rate">{hotel?.rate}</span>
                <span>{hotel?.type}</span>
              </div>
            </div>
          )
        })}

        {/* <div className="hotel-wrap">
          <img src={process.env.PUBLIC_URL + '/images/hotel_search_2.jpg'} />
          <a href="#" onClick={() => window.location.replace("/detail")}>
            <h4 className="hotel-content">{props.hotels[1]?.name}</h4>
          </a>
          <h4 className="hotel-content">{props.hotels[1]?.city}</h4>
          <h4 className="hotel-content">Starting from {props.hotels[1]?.price}$</h4>
          <div className="hotel-rate">
            <span className="rate">{props.hotels[1]?.rate}</span>
            <span>{props.hotels[1]?.type}</span>
          </div>
        </div>

        <div className="hotel-wrap">
          <img src={process.env.PUBLIC_URL + '/images/hotel_search_3.jpg'} />
          <a href="#" onClick={() => window.location.replace("/detail")}>
            <h4 className="hotel-content">{props.hotels[2]?.name}</h4>
          </a>
          <h4 className="hotel-content">{props.hotels[2]?.city}</h4>
          <h4 className="hotel-content">Starting from {props.hotels[2]?.price}$</h4>
          <div className="hotel-rate">
            <span className="rate">{props.hotels[2]?.rate}</span>
            <span>{props.hotels[2]?.type}</span>
          </div>
        </div> */}
      </div>
    </div>
  );
}
export default TopHotel;