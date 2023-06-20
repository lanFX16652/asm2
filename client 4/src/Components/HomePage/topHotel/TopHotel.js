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
              <img src={topHotel?.photos[0]} />
              <div className="topHotel-info-wrapper">
                <Link to={`/hotel-detail/${topHotel?._id}`}>
                  <h4 className="hotel-content">{topHotel?.name}</h4>
                </Link>

                <p className="hotel-content">{topHotel?.city}</p>
                <h4 className="hotel-content">Starting from {topHotel?.price}$</h4>
              </div>
            </div>
          )
        })}
      </div>


    </div>
  );
}
export default TopHotel;