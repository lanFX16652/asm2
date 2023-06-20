import "./SearchBar.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateDataSearch } from '../../../redux/searchSlice'

function SearchBar() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    //Define useState for DateRange
    const [city, setCity] = useState("");
    const [people, setPeople] = useState(0);

    //Define handeleClick function to popup DateRange
    const [popup, setPopup] = useState(false);

    const handleClickOpen = () => {
        if (!popup)
            setPopup(true);
    };

    // logic date picker
    const [calendar, setCalendar] = useState([
        {
            startDate: undefined,
            endDate: undefined,
            key: "selection"
        }
    ]);

    const [countSelectDate, setCountSelectDate] = useState(0)

    const isSearchAble = city && people && calendar[0].startDate && calendar[0].endDate

    const handleOnChange = (ranges) => {
        const { selection } = ranges;
        setCalendar([selection]);
        setCountSelectDate(countSelectDate + 1)
    };

    // logic search: gui thong tin search vao redux
    const searchHanlder = () => {
        dispatch(updateDataSearch({
            city,
            timeRange: [calendar[0].startDate.toDateString(), calendar[0].endDate.toDateString()],
            people,
        }))
        navigate('/search')
    }

    useEffect(() => {
        if (countSelectDate === 2) {
            setPopup(false)
            setCountSelectDate(0)
        }
    }, [countSelectDate])

    const startDate = calendar[0].startDate ? calendar[0].startDate?.toLocaleDateString('en-GB') : undefined
    const endDate = calendar[0].endDate ? calendar[0].endDate?.toLocaleDateString('en-GB') : undefined

    const valueDateInput = startDate && endDate ? `${startDate} to ${endDate}` : ''
    return (
        <div className="wrapper">
            <div className="header">
                <h1 className="header-title">A lifetime of discount? It's Genius.</h1>
                <h2 className="header-content">
                    Get rewarded for your travels - unlock instant savings of 10% or more
                    with a free acount
                </h2>
            </div>

            <div className="input-container">
                <div>
                    <i className="bi bi-taxi-front"></i>
                    {/* <i className="fa fa-bed"></i> */}
                    <input
                        className="input"
                        type="text"
                        placeholder="Where are you going?"
                        onChange={(e) => setCity(e.target.value)}
                    ></input>
                </div>

                <div onClick={handleClickOpen} className="calendar-box-wrapper">
                    <i className="bi bi-calendar3"></i>
                    {/* <i className="fa fa-calendar" onClick={handleClickOpen}></i> */}
                    <input type="text" value={valueDateInput} className="input" placeholder="Enter Date"></input>
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
                    <i className="bi bi-person"></i>
                    {/* <i className="fa fa-female"></i> */}
                    <input
                        className="input"
                        type="number"
                        placeholder="1 adult - 0 children - 1 room"
                        onChange={(e) => setPeople(e.target.value)}
                    ></input>
                </div>
                <button
                    className="search"
                    disabled={!isSearchAble}
                    onClick={searchHanlder}
                >
                    Search
                </button>
            </div>
        </div>
    );
}

export default SearchBar;
