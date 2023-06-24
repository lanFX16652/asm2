import RenderCityItem from "./RenderCityItem";
import "./RenderCity.css";

//Render cities on HomePage page
function RenderCity(props) {

  const propsInHochiMinh = props.hotels.filter(hotel => hotel.city === "Ho Chi Minh");
  const propsInHanoi = props.hotels.filter(hotel => hotel.city === "Ha Noi");
  const propsInDanang = props.hotels.filter(hotel => hotel.city === "Da Nang");

  return (
    <div className="city-container">
      {/* {props.renderCity.map((hotels) => (
        <RenderCityItem hotels={hotels} />
      ))} */}
      <div className="image-wrap">
        <img src="https://images.unsplash.com/photo-1536086845112-89de23aa4772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aG8lMjBjaGklMjBtaW5oJTIwY2l0eSUyMHZpZXRuYW18ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" />
        <h1 className="city-name"> Ho Chi Minh</h1>
        <h2 className="city-subText"> {propsInHochiMinh.length} properties</h2>
      </div>

      <div className="image-wrap">
        <img src="https://images.unsplash.com/photo-1581350845039-3318c9bd4cac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGhhbm9pfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60" />
        <h1 className="city-name"> Ha Noi</h1>
        <h2 className="city-subText"> {propsInHanoi.length} properties</h2>
      </div>

      <div className="image-wrap">
        <img src="https://images.unsplash.com/photo-1555979864-7a8f9b4fddf8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGElMjBuYW5nJTIwdmlldG5hbXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" />
        <h1 className="city-name"> Da Nang</h1>
        <h2 className="city-subText"> {propsInDanang.length} properties</h2>
      </div>
    </div>
  );
}

export default RenderCity;