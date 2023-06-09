import "./App.css";
import HomePage from "./Components/HomePage/HomePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import NavBar from "./Components/NavBar/NavBar";
import SearchPage from "./Components/SearchPage/SearchPage";
import HotelDetail from "./Components/HotelDetailPage/HotelDetail";
import HotelBooking from "./Components/HotelBookingPage/HotelBooking";
import TransactionPage from "./Components/TransactionPage/TransactionPage";
import AuthWrapper from "./Components/AuthWrapper/AuthWrapper";

function App() {
  return (
    <Router>
      <NavBar />
      <div className="App">
        <Routes>
          <Route element={<AuthWrapper />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/hotel-detail/:id" element={<HotelDetail />} />
            <Route path="/booking/:id" element={<HotelBooking />} />
            <Route path="/transactions" element={<TransactionPage />} />
          </Route>
        </Routes>


      </div>
    </Router >
  );
}

export default App;
