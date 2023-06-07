import { useEffect } from 'react';
import './SearchPage.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SearchPage() {
    const search = useSelector((state) => state.search.search)
    const navigate = useNavigate();

    useEffect(() => {
        //Gọi API để hiển thị danh sách phim mà người dùng tìm kiếm
        async function fetchSearchMovie(place, time, people) {
            try {
                const response = await fetch(
                    `http://localhost:5000/search?place=${place}&time=${time}&people=${people}`,
                    {
                        method: "POST",
                        // body: JSON.stringify({
                        //     "keyword": query
                        // }),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
            } catch (err) {
                const errorMessage = "Something went wrong: " + err.message;
                // setError(errorMessage);
            }
        }
    }, [])

    const fetchHotelDetail = (hotelId) => {
        axios({
            method: "GET",
            url: `http://localhost:5000/hotel/${hotelId}`
        })
        .then(result => {
            console.log(result);
            navigate(`/hotel/${hotelId}`)
        })
    }

    return (
        <div className='searchPage'>
            {/* search frame */}

            <div className="popup-container">
                <h2 className="search-title">Search</h2>

                <div className="destination-wrap">
                    <p>Destination</p>
                    <input className="popup-input"></input>
                </div>

                <div className="date-wrap">
                    <p>Check-in Date</p>
                    <input
                        className="popup-input"
                        placeholder="06/24/2022 to 06/24/2022"
                    ></input>
                </div>

                <div>
                    <p>Options</p>
                    <div className="option-input-wrap">
                        <div className="option-wrap">
                            <p>Min price per night</p>
                            <input className="option-input"></input>
                        </div>

                        <div className="option-wrap">
                            <p>Max price per night</p>
                            <input className="option-input"></input>
                        </div>

                        <div className="option-wrap">
                            <p>Adult</p>
                            <input className="option-input" placeholder="1"></input>
                        </div>

                        <div className="option-wrap">
                            <p>Children</p>
                            <input className="option-input" placeholder="0"></input>
                        </div>

                        <div className="option-wrap">
                            <p>Room</p>
                            <input className="option-input" placeholder="1"></input>
                        </div>
                    </div>

                    <button className="popup-searchBtn">Search</button>
                </div>
            </div>


            {/* Searched-result rendering */}
            <div className="search-container">
                <div className='searchHotel-item'>
                    <div className="search-image-container">
                        <img src={process.env.PUBLIC_URL + '/images/hotel_1.webp'}></img>
                    </div>

                    <div className="hotel-content">
                        <h2 className="hotel-name">Lagoon</h2>
                        <p>640m from center</p>
                        <p className="hotel-tag">aaa</p>
                        <p className="hotel-description">Beautiful</p>
                        <p>Villa</p>
                        <p className="cancel">Free cancellation</p>
                        <p className="inviting">
                            You can cancel later, so lock in this great price today!
                        </p>
                    </div>

                    <div className="rate-container">
                        <div className="rate-wrap">
                            <span className="rate-text">9points</span>
                            <span className="rate-point">9</span>
                        </div>
                        <div>
                            <h2 className="hotelPrice">$900</h2>
                            <p className="tax">Includes taxes and fees</p>
                            <button className="availabilityBtn">See Availability</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchPage;