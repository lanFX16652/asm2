// import PropertyTypeItem from "./PropertyTypeItem";
import "./PropertyType.css";

//Render property types on HomePage page
//Parent Component
function PropertyType(props) {
    console.log("props Prop ", props);
    
    const propHotelType = props.hotels.filter(hotel => hotel.type == "hotel");
    // console.log(propHotelType);
    const propApartmentType = props.hotels.filter(hotel => hotel.type == "apartment");
    const propVillaType = props.hotels.filter(hotel => hotel.type == "villa");
    const propResortType = props.hotels.filter(hotel => hotel.type == "resort");
    const propCabinType = props.hotels.filter(hotel => hotel.type == "cabin");

  return (
    <div>
      <h2 className="property-title">Browse by property type</h2>
      <div className="property-container">
        {/* {props.propertyType.map((type) => (
          <PropertyTypeItem type={type} />
        ))} */}
        <div className="property-wrap">
            <img src={process.env.PUBLIC_URL + '/images/type_1.webp'} />
            <h3>Hotels</h3>
            <p>{propHotelType.length} properties</p>
        </div>

        <div className="property-wrap">
            <img src={process.env.PUBLIC_URL + '/images/type_2.jpg'} />
            <h3>Apartments</h3>
            <p>{propApartmentType.length} properties</p>
        </div>

        <div className="property-wrap">
            <img src={process.env.PUBLIC_URL + '/images/type_3.jpg'} />
            <h3>Resorts</h3>
            <p>{propResortType.length} properties</p>
        </div>

        <div className="property-wrap">
            <img src={process.env.PUBLIC_URL + '/images/type_4.jpg'} />
            <h3>Villas</h3>
            <p>{propVillaType.length} properties</p>
        </div>

        <div className="property-wrap">
            <img src={process.env.PUBLIC_URL + '/images/type_5.jpg'} />
            <h3>Cabins</h3>
            <p>{propCabinType.length} properties</p>
        </div>

      </div>
    </div>
  );
}

export default PropertyType;