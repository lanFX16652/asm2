import RenderCityItem from "./RenderCityItem";
import "./RenderCity.css";

//Render cities on HomePage page
//Parent Component
function RenderCity(props) {
  // console.log("props1", props);
  const propsInHochiMinh = props.hotels.filter(hotel => hotel.city === "Ho Chi Minh");
  // console.log(propsInHochiMinh);

  const propsInHanoi = props.hotels.filter(hotel => hotel.city === "Ha Noi");
  // console.log(propsInHanoi);

  const propsInDanang = props.hotels.filter(hotel => hotel.city === "Da Nang");
  // console.log(propsInDanang);

  return (
    <div className="city-container">
      {/* {props.renderCity.map((hotels) => (
        <RenderCityItem hotels={hotels} />
      ))} */}
      <div className="image-wrap">
        <img src={process.env.PUBLIC_URL + '/images/city_1.webp'} />
        <h1 className="city-name"> Ho Chi Minh</h1>
        <h2 className="city-subText"> {propsInHochiMinh.length} properties</h2>
      </div>

      <div className="image-wrap">
        <img src={process.env.PUBLIC_URL + '/images/city_1.webp'} />
        <h1 className="city-name"> Ha Noi</h1>
        <h2 className="city-subText"> {propsInHanoi.length} properties</h2>
      </div>

      <div className="image-wrap">
        <img src={process.env.PUBLIC_URL + '/images/city_1.webp'} />
        <h1 className="city-name"> Da Nang</h1>
        <h2 className="city-subText"> {propsInDanang.length} properties</h2>
      </div>
    </div>
  );
}

export default RenderCity;