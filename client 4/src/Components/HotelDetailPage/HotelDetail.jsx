import classes from "./HotelDetail.module.css";
import useFetchHotelDetail from "../../hooks/useFetchHotelDetail";
import { useParams, Link } from "react-router-dom";

const HotelDetail = () => {
  const params = useParams();
  console.log(params);
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
  } = useFetchHotelDetail(params.id);

  console.log(name);

  return (
    <div className={classes.container}>
      <div className={classes.detail_title}>
        <h2>{name}</h2>
        <Link to={`/booking/${params.id}`}>
          <button className={classes.reserveBtn}>Reserve or Book Now!</button>
        </Link>
      </div>

      <div>
        <div className={classes.address_wrap}>
          <i class="fa fa-taxi"></i>
          <p className={classes.address}>{address}</p>
        </div>
        <p className={classes.distance}>{distance}</p>
        <p className={classes.detail_price}>a</p>
      </div>

      <div>
        <div className={classes.imageWrap1}>
          <img src="/images/hotel_detail_1.jpg" />
          <img src="/images/hotel_detail_2.jpg" />
          <img src="/images/hotel_detail_3.jpg" />
        </div>
        <div className={classes.imageWrap2}>
          <img src="/images/hotel_detail_4.jpg" />
          <img src="/images/hotel_detail_5.jpg" />
          <img src="/images/hotel_detail_6.jpg" />
        </div>

        <div className={classes.content_container}>
          <div className={classes.content_wrap}>
            <h2>{name}</h2>
            <p className={classes.content_description}>{description}</p>
          </div>

          <div className={classes.aside}>
            <h4 className={classes.aside_title}>Perfect for a 9-night stay!</h4>
            <p className={classes.aside_content}>
              Located in the real heart of Krakow, this property has an
              excellent location score of 9.8!
            </p>
            <div className={classes.aside_price}>
              <h2>${price}</h2>
              <h2 className={classes.aside_night}>{"(9-night)"}</h2>
            </div>
            <Link to={`/booking/${params.id}`}>
              <button className={classes.bookBtn}>Reserve or Book Now!</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetail;
