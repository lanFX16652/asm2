import "./RenderCityItem.css";

//Render cities on Homepage page
//Child component
function RenderCityItem(props) {
  console.log("props", props);
  return (
    <div className="image-wrap">
      {/* <img src={process.env.PUBLIC_URL + props.city.image} />
      <h1 className="city-name"> {props.city.name}</h1>
      <h2 className="city-subText"> {props.city.subText}</h2> */}
       <img src={process.env.PUBLIC_URL + '/images/city_1.webp'} />
      <h1 className="city-name"> {props.hotels.city}</h1>
      <h2 className="city-subText"> aaaa</h2>
    </div>
  );
}
export default RenderCityItem;
