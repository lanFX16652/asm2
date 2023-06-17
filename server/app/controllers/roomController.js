import Room from "../models/roomModel.js";

// CONTROLLERS FOR ADMIN PAGE
const createRoom = async (req, res) => {
  //Create new room
  const roomsNumber = req.body.roomsNumber.map((roomNumber) => {
    return {
      number: roomNumber,
      unavailableDate: [],
    };
  });

  const newRoom = await new Room({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    maxPeople: req.body.maxPeople,
    roomsNumber,
  });

  //Save to DB
  const room = await newRoom.save();

  //Trả dữ liệu về
  res.status(201).json({
    message: "Success",
    newRoom: room,
  });
};

const listRoom = async (req, res) => {
  const page = +req.query.page;
  const limit = +req.query.limit;

  const listRoom = await Room.find(
    {},
    {},
    {
      limit,
      skip: (page - 1) * limit,
    }
  );
  const totalRoom = await Room.count({});
  const totalPage = Math.ceil(totalRoom / limit);

  res.status(200).json({
    data: listRoom,
    page,
    totalPage,
    limit,
    totalRoom,
  });
};

const deleteRoom = async (req, res) => {
  const deletedRoom = await Room.deleteOne({ _id: req.params.id });
  res.status(200).json({ message: "delete succeed" });
};

// ********************
// CONTROLLER FOR CLIENT PAGE
const getRoomNumberList = (req, res) => {
  Room.findById(req.params.id)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => console.log(err));
};

export { createRoom, listRoom, deleteRoom, getRoomNumberList };
