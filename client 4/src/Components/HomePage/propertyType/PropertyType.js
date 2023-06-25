import "./PropertyType.css";


function PropertyType(props) {

  const propHotelType = props.hotels.filter(hotel => hotel.type == "Hotel");
  const propApartmentType = props.hotels.filter(hotel => hotel.type == "Apartment");
  const propVillaType = props.hotels.filter(hotel => hotel.type == "Villa");
  const propResortType = props.hotels.filter(hotel => hotel.type == "Resort");
  const propCabinType = props.hotels.filter(hotel => hotel.type == "Cabin");

  return (
    <div>
      <h2 className="property-title">Browse by property type</h2>
      <div className="property-container">
        {/* {props.propertyType.map((type) => (
          <PropertyTypeItem type={type} />
        ))} */}
        <div className="property-wrap">
          <img src={'/images/type_1.webp'} />
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