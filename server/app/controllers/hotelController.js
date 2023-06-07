const Hotel = require("../models/hotelModel");


// CONTROLLERS FOR ADMIN PAGE
const createHotel = async (req, res) => {
    console.log(req.body);

    //Create new hotel
    const newHotel = await new Hotel({
        name: req.body.name,
        type: req.body.type,
        city: req.body.city,
        address: req.body.address,
        distance: req.body.distance,
        photos: req.body.photos,
        description: req.body.description,
        price: req.body.price,
        featured: req.body.featured,
        rooms: req.body.rooms,
    })

    //Save to DB
    const hotel = await newHotel.save();

    //Trả dữ liệu
    res.status(200).json({
        message: "Success",
        newHotel: hotel,
    })
}

const listHotel = async (req, res) => {
    // console.log(req)

    const page = +req.query.page;
    const limit = +req.query.limit;

    const listHotel = await Hotel.find({}, {}, {
        limit,
        skip: (page - 1) * limit
    })
    const totalHotel = await Hotel.count({})
    const totalPage = Math.ceil(totalHotel / limit)

    res.status(200).json({
        data: listHotel,
        page,
        totalPage,
        limit,
        totalHotel
    })
}

const deleteHotel = async (req, res) => {
    console.log(req.params);
    const deletedHotel = await Hotel.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "delete succeed" })
}; 


// ***************************
// CONTROLLERS FOR CLIENT PAGE
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

module.exports = {createHotel, listHotel, deleteHotel, homepage, searchHotel, hotelDetail}