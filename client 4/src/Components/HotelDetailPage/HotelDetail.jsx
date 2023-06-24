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

  console.log(photos);

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
          <i className="bi bi-geo-alt-fill"></i>
          <p className={classes.address}>{address}</p>
        </div>
        <div className={classes.info_wrap}>
          <p className={classes.distance}>Excellent location - {distance}</p>
          <p className={classes.detail_price}>
            Book a stay over {price}$ at this property and get a free airport
            taxi
          </p>
        </div>
      </div>

      <div className={classes["image-container"]}>
        <div className={classes["image-wrapper"]}>
          {photos?.map((photo) => (
            <div className={classes["image-item"]}>
              <img src={photo} />
            </div>
          ))}
        </div>

        <div className={classes.content_container}>
          <div className={classes.content_wrap}>
            <h2>{name}</h2>
            <p className={classes.content_description}>{description}</p>
          </div>

          <div className={classes.aside}>
            <h4 className={classes.aside_title}>Perfect for a 1-night stay!</h4>

            <div className={classes.aside_price}>
              <h2>${price}</h2>
              <span className={classes.aside_night}>
                <p>{"(1-night)"}</p>
              </span>
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
