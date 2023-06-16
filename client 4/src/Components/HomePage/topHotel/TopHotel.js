import "./TopHotel.css";
import useFetchHotelDetail from "../../../hooks/useFetchHotelDetail";
import { Link } from "react-router-dom";

//Render Hotel on HomePage page
//Parent Component
function TopHotel(props) {
  const topHotels = props.hotels.sort((a, b) => b.rating - a.rating)
  return (
    <div>
      <h2 className="hotel-title">Homes guests love</h2>

      <div className="hotel-container">

        {topHotels.map((topHotel, index) => {
          if (index > 2) {
            return <></>
          }
          return (
            <div className="hotel-wrap">
              <img src={process.env.PUBLIC_URL + '/images/hotel_search_1.webp'} />
              <Link to={`/hotel-detail/${topHotel?._id}`}>
                <h4 className="hotel-content">{topHotel?.name}</h4>
              </Link>

              <h4 className="hotel-content">{topHotel?.city}</h4>
              <h4 className="hotel-content">Starting from {topHotel?.price}$</h4>
              <div className="hotel-rate">
                <span className="rate">{topHotel?.rating}</span>
                <span>{topHotel?.type}</span>
              </div>
            </div>
          )
        })}
      </div>


    </div>
  );
}
export default TopHotel;