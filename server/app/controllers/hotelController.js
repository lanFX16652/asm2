// const Hotel = require("../models/hotelModel");
import Hotel from "../models/hotelModel";
import Room from "../models/roomModel";
import Transaction from "../models/transactionModel";

// CONTROLLERS FOR ADMIN PAGE
const createHotel = async (req, res) => {

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
    const deletedHotel = await Hotel.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "delete succeed" })
};


// ***************************
// CONTROLLERS FOR CLIENT PAGE
const homepage = (req, res) => {
    Hotel.find({})
        .then(result => {
            res.status(200).json({
                message: "success",
                hotels: result,
            })
        })
        .catch(err => console.log(err))
}

const searchHotel = async (req, res) => {
    const city = req.body.city;
    const timeRange = req.body.timeRange;
    const people = req.body.people;
    console.log(req.body);
    const page = +req.query.page;
    const limit = +req.query.limit;

    const listHotelFilterCity = await Hotel.find({
        city: {
            $regex: city.trim(),
            $options: 'i'
        },
    }, {}, {}).populate('rooms')

    const listHotelFilterCityRoom = listHotelFilterCity.filter(hotel => {
        let isReturn = false
        let newHotel = hotel

        // lap qua tung room o tron rooms cua hotel nay
        //  room.maxPeople lon hoac bang people yeu cau => isReturn = true
        const newRooms = hotel.rooms.map(room => {
            if (room.maxPeople >= people) {
                isReturn = true
                return room
            }
        }).filter(Boolean)

        // neu isReturn = true return hotel nay
        // neu khong khong tra ve ket qua
        if (isReturn) {
            newHotel.rooms = newRooms
            return newHotel
        }
    })

    const listHotelId = listHotelFilterCityRoom.map(hotel => {
        return hotel._id
    })


    const transactionList = await Transaction.find({
        hotel: {
            $in: listHotelId
        }
    })


    const transactionBooked = transactionList.filter(transaction => {
        // cua transaction
        const dateHadBooked = [new Date(transaction.dateStart).getTime(), new Date(transaction.dateEnd).getTime()]

        // client gui len 
        const dateRequest = [new Date(timeRange.startDate).getTime(), new Date(timeRange.endDate).getTime()]

        // startDateRequest <= startDateTransaction && endDateRequest <= endDateTransaction
        if (dateRequest[0] <= dateHadBooked[0] && dateHadBooked[0] <= dateRequest[1]) {
            return true
        }
        return false
    })

    console.log(transactionBooked);
    res.status(200)

}

const hotelDetail = (req, res) => {

    Hotel.findById(req.params.id)
        .then((result) => {
            res.status(200).json(result)
        })
        .catch(err => console.log(err))
}

// module.exports = { createHotel, listHotel, deleteHotel, homepage, searchHotel, hotelDetail }
export { createHotel, listHotel, deleteHotel, homepage, searchHotel, hotelDetail }