const Hotel = require("../models/hotelModel");
const Room = require("../models/roomModel")

const homepage = (req, res) => {
    Hotel.find({})
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: "success",
            hotels: result,
        })
    })
    .catch(err => console.log(err))
}

const searchHotel = (req, res) => {
    console.log(req.query);
    const place = req.query.place;;
    const time = req.query.timeRange;
    const people = req.query.people
    console.log(keyword);

    Hotel.find({room})
    .then(result => {
        console.log(result);
        res.status(200).json({result: result})
    })
    .catch(err => console.log(err))
}

const hotelDetail = (req, res) => {
    console.log(req.params);

    Hotel.findById(req.params.id)
    .then((result) => {
        res.status(200).json(result)
    })
    .catch(err => console.log(err))
}

const getRoomNumberList = (req, res) => {
    console.log("roomlistnumber", req.params);

    Room.findById(req.params.id)
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err => console.log(err));
}

module.exports = { homepage, searchHotel, hotelDetail, getRoomNumberList }