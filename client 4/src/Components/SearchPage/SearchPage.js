import { useState, useEffect } from 'react';
import classes from './SearchPage.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { DateRange } from "react-date-range";
import { addDays, subDays } from "date-fns";
import { updateDataSearch } from '../../redux/searchSlice';

import axios from 'axios';

function SearchPage() {
    const dispatch = useDispatch()
    const search = useSelector((state) => state.search.search);
    const user = JSON.parse(localStorage.getItem("userData"));
    // state list paginate
    const [page, setPage] = useState(1);
    const [hotelsListSearch, setHotelsListSearch] = useState([]);

    // state form 
    const [city, setCity] = useState(search.city);
    const [people, setPeople] = useState(search.people);
    const [timechoose, setTimeChoose] = useState({ startDate: search.timeRange[0], endDate: search.timeRange[1] })

    // state calender
    const [popup, setPopup] = useState(false);
    const [calendar, setCalendar] = useState([
        {
            startDate: subDays(new Date(), 7),
            endDate: addDays(new Date(), 1),
            key: "selection"
        }
    ]);
    const [countSelectDate, setCountSelectDate] = useState(0)

    const isSearchAble = city && people && timechoose

    const handleOnChange = (ranges) => {
        const { selection } = ranges;
        setCalendar([selection]);
        setCountSelectDate(countSelectDate + 1)
    };

    const fetchHotelSearch = () => {
        axios({
            method: "POST",
            url: "http://localhost:5000/client/hotel/search",
            data: {
                city,
                people,
                timeRange: {
                    startDate: calendar[0].startDate,
                    endDate: calendar[0].endDate
                }
            },
            params: {
                page: page,
                limit: 2,
            },
            headers: {
                Authorization: `Bearer ${user?.accessToken}`,
            },
        })
            .then((result) => {
                setHotelsListSearch(result.data);
            })
    }

    // logic search: gui thong tin search vao redux
    const searchHanlder = () => {
        dispatch(updateDataSearch({
            city,
            timeRange: [calendar[0].startDate.toLocaleDateString('en-GB'), calendar[0].endDate.toLocaleDateString('en-GB')],
            people,
        }))
        fetchHotelSearch()

    }

    const nextPageHandler = () => {
        setPage(page + 1);
    };

    const prevPageHandler = () => {
        setPage(page - 1);
    };

    const choosePageHandler = (page) => {
        setPage(page);
    };

    const handleClickOpen = () => {
        if (!popup)
            setPopup(true);
    };

    useEffect(() => {
        fetchHotelSearch();
    }, [])


    useEffect(() => {
        if (countSelectDate === 2) {
            setPopup(false)
            const startDate = calendar[0].startDate.toLocaleDateString('en-US');
            const endDate = calendar[0].endDate.toLocaleDateString('en-US');
            setTimeChoose({
                startDate,
                endDate
            })
            setCountSelectDate(0)
        }
    }, [countSelectDate])

    return (
        <div className={classes['searchPage']}>

            {/* search frame */}
            <div className={classes["popup-container"]}>
                <h2 className={classes["search-title"]}>Search</h2>

                <div className={classes["destination-wrap"]}>
                    <p>Destination</p>
                    <input className={classes["popup-input"]} value={city} onChange={(e) => setCity(e.target.value)}></input>
                </div>

                <div className={classes["date-wrap"]} onClick={handleClickOpen}>
                    <p>Check-in Date</p>
                    <input
                        value={`${timechoose.startDate.toLocaleDateString('en-US')} to ${timechoose.endDate.toLocaleDateString('en-US')}`}
                        className={classes["popup-input"]}
                    ></input>
                    <div className="calendar-box">
                        {popup ? (
                            <DateRange
                                editableDateInputs={true}
                                moveRangeOnFirstSelection={false}
                                className="date"
                                minDate={new Date()}
                                showSelectionPreview={true}
                                onChange={handleOnChange}
                                ranges={calendar}
                            />
                        ) : (
                            ""
                        )}
                    </div>
                </div>

                <div>
                    <p>Options</p>
                    <div className={classes["option-input-wrap"]}>
                        <div className={classes["option-wrap"]}>
                            <p>Min price per night</p>
                            <input className={classes["option-input"]}></input>
                        </div>

                        <div className={classes["option-wrap"]}>
                            <p>Max price per night</p>
                            <input className={classes["option-input"]}></input>
                        </div>

                        <div className={classes["option-wrap"]}>
                            <p>Adult</p>
                            <input className={classes["option-input"]} placeholder="1"></input>
                        </div>

                        <div className={classes["option-wrap"]}>
                            <p>Children</p>
                            <input className={classes["option-input"]} placeholder="0"></input>
                        </div>

                        <div className={classes["option-wrap"]}>
                            <p>Room</p>
                            <input className={classes["option-input"]} placeholder="1"></input>
                        </div>
                        <div className={classes["option-wrap"]}>
                            <p>Max People</p>
                            <input className={classes["option-input"]} value={search.people} onChange={(e) => setPeople(e.target.value)}></input>
                        </div>
                    </div>


                    <button className={classes["popup-searchBtn"]} disabled={!isSearchAble} onClick={searchHanlder}>Search</button>
                </div>
            </div>

            <div className={classes['hotel-list-wrapper']}>
                {/* Searched-result rendering */}
                <div className={classes["search-container"]}>
                    {hotelsListSearch?.result?.map((hotel) => {
                        return (
                            <div className={classes['searchHotel-item']}>
                                <div className={classes["search-image-container"]}>
                                    <img src={process.env.PUBLIC_URL + '/images/hotel_1.webp'}></img>
                                </div>

                                <div className={classes["hotel-content"]}>
                                    <h2 className={classes["hotel-name"]}>{hotel.name}</h2>
                                    <p>{hotel.distance}</p>
                                    <p className={classes["hotel-tag"]}>aaa</p>
                                    <p className={classes["hotel-description"]}>{hotel.description}</p>
                                    <p>{hotel.type}</p>
                                    <p className={classes["cancel"]}>Free cancellation</p>
                                    <p className={classes["inviting"]}>
                                        You can cancel later, so lock in this great price today!
                                    </p>
                                </div>

                                <div className={classes["rate-container"]}>
                                    <div className={classes["rate-wrap"]}>
                                        <span className="rate-text">{hotel.rating}</span>
                                        <span className={classes["rate-point"]}>{hotel.rating}</span>
                                    </div>
                                    <div>
                                        <h2 className={classes["hotelPrice"]}>${hotel.price}</h2>
                                        <p className={classes["tax"]}>Includes taxes and fees</p>
                                        <button className={classes["availabilityBtn"]}>See Availability</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className={classes["paginate-wrapper"]}>
                    <div className={classes["paginate-page"]}>
                        {hotelsListSearch?.totalSearchHotel} hotel / page {page}
                    </div>
                    <div className={classes["paginate-action"]}>
                        <button onClick={prevPageHandler} disabled={page === 1}>
                            Trang trước
                        </button>
                        {Array.from(Array(hotelsListSearch?.totalPage).keys()).map((item) => (
                            <button
                                key={item}
                                disabled={hotelsListSearch?.page === item + 1}
                                onClick={() => choosePageHandler(item + 1)}
                            >
                                {item + 1}
                            </button>
                        ))}

                        <button
                            disabled={hotelsListSearch?.page === hotelsListSearch?.totalPage}
                            onClick={nextPageHandler}
                        >
                            Trang sau
                        </button>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default SearchPage;