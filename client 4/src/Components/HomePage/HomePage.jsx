import axios from "axios";
import RenderCity from "./renderCity/RenderCity";
import { useState, useEffect } from "react";
import PropertyType from "./propertyType/PropertyType";
import TopHotel from "./topHotel/TopHotel";
import SearchBar from "./searchBar/SearchBar";
import { useSelector } from "react-redux";

const HomePage = () => {
  const [hotels, setHotels] = useState([]);

  const fetchHomePage = async () => {
    const user = JSON.parse(localStorage.getItem("userData"));

    try {
      const res = await axios.get("http://localhost:5000/client/homepage", {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      });
      setHotels(res.data.hotels);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchHomePage();
  }, []);

  return (
    <div>
      <SearchBar />
      <RenderCity hotels={hotels} />
      <PropertyType hotels={hotels} />
      <TopHotel hotels={hotels} />
    </div>
  );
};

export default HomePage;
