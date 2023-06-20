import Hotel from '../models/hotelModel.js';
import { parseDateToArray } from '../helper/parseDateToArray.js';

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
  });

  //Save to DB
  const hotel = await newHotel.save();

  //Trả dữ liệu
  res.status(200).json({
    message: 'Success',
    newHotel: hotel,
  });
};

const listHotel = async (req, res) => {
  const page = +req.query.page;
  const limit = +req.query.limit;

  const listHotel = await Hotel.find(
    {},
    {},
    {
      limit,
      skip: (page - 1) * limit,
    },
  );
  const totalHotel = await Hotel.count({});
  const totalPage = Math.ceil(totalHotel / limit);

  res.status(200).json({
    data: listHotel,
    page,
    totalPage,
    limit,
    totalHotel,
  });
};

const deleteHotel = async (req, res) => {
  const deletedHotel = await Hotel.deleteOne({ _id: req.params.id });
  res.status(200).json({ message: 'delete succeed' });
};

// ***************************
// CONTROLLERS FOR CLIENT PAGE
const homepage = (req, res) => {
  Hotel.find({})
    .then((result) => {
      res.status(200).json({
        message: 'success',
        hotels: result,
      });
    })
    .catch((err) => console.log(err));
};

const searchHotel = async (req, res) => {
  const city = req.body.city;
  const timeRange = req.body.timeRange;
  const people = req.body.people;
  const page = +req.query.page;
  const limit = +req.query.limit;

  const timeRangeRequest = parseDateToArray(
    timeRange.startDate,
    timeRange.endDate,
    true
  );

  //TẠO MẢNG HOTEL THỎA ĐIỀU KIỆN CITY
  const listHotelFilterCity = await Hotel.find(
    {
      city: {
        $regex: city.trim(),
        $options: 'i',
      },
    },
    {},
    {},
  ).populate('rooms');

  // filter qua tung khach san trong danh sach khac san thoa dieu kien city
  const listHotel = listHotelFilterCity.filter((hotel) => {
    let isMatchPeople = false;
    let isMatchTimeRange = true;

    // lap qua tung loai phong trong khac san thoa dieu kien city
    hotel.rooms.forEach((room) => {

      // xac dinh neu co mot loai phong du dieu khien so nguoi thi pass dieu kien maxPeople
      if (room.maxPeople >= people) {
        isMatchPeople = true;
      }

      // dung phuong thuc every de xac dinh toan bo loai phong  bi het phong 
      const isOutOfRoom = room.roomsNumber.every((roomNumber) => {

        return roomNumber.unavailableDate.some((date) =>
          timeRangeRequest.includes(date.toDateString()),
        );
      });

      if (isOutOfRoom) isMatchTimeRange = false;
    });

    if (isMatchPeople && isMatchTimeRange) {
      return true;
    }

    return false;
  });

  // return res.status(200).json(listHotel);
  return res.status(200).json({
    data: listHotel,
    page: page,
    limit: limit,
    totalHotel: listHotel.length,
    totalPage: Math.ceil(listHotel.length / limit)
  })
};

const hotelDetail = (req, res) => {
  Hotel.findById(req.params.id)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => console.log(err));
};

export {
  createHotel,
  listHotel,
  deleteHotel,
  homepage,
  searchHotel,
  hotelDetail,
};
