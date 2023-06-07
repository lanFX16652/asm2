const Hotel = require("../models/hotelModel");
const Room = require("../models/roomModel")

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

const createRoom = async (req, res) => {
    // console.log(req.body);

    //Create new room
    const newRoom = await new Room({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        maxPeople: req.body.maxPeople,
        roomNumbers: req.body.roomNumbers,
    })

    //Save to DB
    const room = await newRoom.save();

    //Trả dữ liệu về
    res.status(201).json({
        message: "Success",
        newRoom: room,
    })
}

const listRoom = async (req, res) => {
    const page = +req.query.page
    const limit = +req.query.limit;

    const listRoom = await Room.find({}, {}, {
        limit,
        skip: (page - 1) * limit
    })
    const totalRoom = await Room.count({})
    const totalPage = Math.ceil(totalRoom / limit)

    res.status(200).json({
        data: listRoom,
        page,
        totalPage,
        limit,
        totalRoom
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
}

const deleteRoom = async (req, res) => {
    console.log(req.params);
    const deletedRoom = await Room.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "delete succeed" })
}

module.exports = { createHotel, createRoom, listRoom, listHotel, deleteHotel, deleteRoom }
