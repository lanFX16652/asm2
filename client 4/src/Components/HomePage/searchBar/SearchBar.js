import "./SearchBar.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import { useState } from "react";
import { Link } from "react-router-dom";
import { addDays, subDays } from "date-fns";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateDataSearch } from '../../../redux/searchSlice'

function SearchBar() {
    //Define useState for DateRange
    const [place, setPlace] = useState("");
    const [people, setPeople] = useState(0);
    const [timechoose, setTimeChoose] = useState('')

    const dispatch = useDispatch()

    // logic date picker
    const [calendar, setCalendar] = useState([
        {
            startDate: subDays(new Date(), 7),
            endDate: addDays(new Date(), 1),
            key: "selection"
        }
    ]);

    const [countSelectDate, setCountSelectDate] = useState(0)

    const handleOnChange = (ranges) => {
        const { selection } = ranges;
        setCalendar([selection]);
        setCountSelectDate(countSelectDate + 1)
    };

    // logic search 
    const searchHanlder = () => {
        updateDataSearch({
            place,
            timeRange: [calendar[0].startDate, calendar[0].endDate],
            people,
        })
    }

    useEffect(() => {
        if (countSelectDate === 2) {
            setPopup(false)
            const startDate = calendar[0].startDate.toLocaleDateString('en-US');
            const endDate = calendar[0].endDate.toLocaleDateString('en-US');
            setTimeChoose(`${startDate} - ${endDate} `)
            setCountSelectDate(0)
        }
    }, [countSelectDate])


    //Define handeleClick function to popup DateRange
    const [popup, setPopup] = useState(false);
    const handleClickOpen = () => {
        setPopup(!popup);
    };



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
                    <i class="bi bi-taxi-front"></i>
                    {/* <i class="fa fa-bed"></i> */}
                    <input
                        className="input"
                        type="text"
                        placeholder="Where are you going?"
                        onChange={(e) => setPlace(e.target.value)}
                    ></input>
                </div>

                <div className="calendar-box-wrapper">
                    <i class="bi bi-calendar3" onClick={handleClickOpen}></i>
                    {/* <i class="fa fa-calendar" onClick={handleClickOpen}></i> */}
                    <input type="text" value={timechoose} className="input" placeholder="Enter Date"></input>
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
                    <i class="bi bi-person"></i>
                    {/* <i class="fa fa-female"></i> */}
                    <input
                        className="input"
                        type="number"
                        placeholder="1 adult - 0 children - 1 room"
                        onChange={(e) => setPeople(e.target.value)}
                    ></input>
                </div>
                <Link to='/search'>
                    <button
                        className="search"
                        onClick={searchHanlder}
                    >
                        Search
                    </button>
                </Link>


            </div>
        </div>
    );
}

export default SearchBar;
