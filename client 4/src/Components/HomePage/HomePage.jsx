// import "./home.css";

// const HomePage = () => {
//   //DUMMY DATA
//   const userData = [
//     {
//       username: "anhduy1202",
//     },
//     {
//       username: "kelly1234",
//     },
//     {
//       username: "danny5678",
//     },
//     {
//       username: "kenny1122",
//     },
//     {
//       username: "jack1234",
//     },
//     {
//       username: "loi1202",
//     },
//     {
//       username: "nhinhi2009",
//     },
//     {
//       username: "kellynguyen1122",
//     },

//   ];
//   return (
//     <main className="home-container">
//       <div className="home-title">User List</div>
//       <div className="home-userlist">
//         {userData.map((user) => {
//           return (
//             <div className="user-container">
//               <div className="home-user">{user.username}</div>
//               <div className="delete-user"> Delete </div>
//             </div>
//           );
//         })}
//       </div>
//     </main>
//   );
// };

// export default HomePage;

// import navBar from "../../data/navBar.json";
// import city from "../../data/city.json";
// import propertyType from "../../data/propertyType.json";
// import hotel_list from "../../data/hotel_list.json";
// import footer from "../../data/footer.json";

// import NavBar from "./NavBar";
// import Header from "./Header";
import axios from "axios";
import RenderCity from "./renderCity/RenderCity";
import { useState, useEffect } from "react";
import PropertyType from "./propertyType/PropertyType";
import TopHotel from "./topHotel/TopHotel";
import SearchBar from "./searchBar/SearchBar";
// import Form from "./Form";
// import Footer from "./Footer";

const HomePage = () => {
  const [hotels, setHotels] = useState([]);

  const fetchHomePage = async () => {
    try {
      const res = await axios.get("http://localhost:5000/homepage");
      console.log(res);
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
      {/* <NavBar navbar={navBar} /> */}
      {/* <Header /> */}
      {/* <RenderCity renderCity={city} /> */}
      <SearchBar />
      <RenderCity hotels={hotels} />
      <PropertyType hotels={hotels} />
      <TopHotel hotels={hotels} />
      {/* <Form /> */}
      {/* <Footer footer={footer} /> */}
    </div>
  );
};

export default HomePage;
