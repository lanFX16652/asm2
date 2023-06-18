import Transaction from '../models/transactionModel.js';
import Room from '../models/roomModel.js';

const createTransaction = async (req, res) => {
  //create transaction

  const dateStart = req.body.dateStart;
  const dateEnd = req.body.dateEnd;
  const newTransaction = await new Transaction({
    user: req.body.user,
    hotel: req.body.hotel,
    rooms: req.body.rooms,
    roomsNumber: req.body.roomsNumber,
    dateStart,
    dateEnd,
    price: req.body.price,
    payment: req.body.payment,
    status: req.body.status,
  });

  //save to database
  const transaction = await newTransaction.save();

  const startDate = new Date(dateStart);
  const endDate = new Date(dateEnd);
  const datesUnavailable = [];
  for (
    let date = startDate;
    date <= endDate;
    date.setDate(date.getDate() + 1)
  ) {
    datesUnavailable.push(new Date(date));
  }

  const updateRoomPromise = req.body.rooms.map((roomId) => {
    return Room.findOneAndUpdate(
      {
        _id: roomId,
        'roomsNumber.number': {
          $in: req.body.roomsNumber,
        },
      },
      {
        $addToSet: {
          'roomsNumber.$.unavailableDate': {
            $each: datesUnavailable,
          },
        },
      },
      {
        new: true,
      },
    );
  });

  await Promise.all(updateRoomPromise).catch((error) => console.log(error));

  //return data
  res.status(201).json(transaction);
};

const listTransaction = async (req, res) => {
  const page = +req.query.page;
  const limit = +req.query.limit;

  const listTransaction = await Transaction.find(
    {},
    {},
    {
      limit,
      skip: (page - 1) * limit,
    },
  ).populate([
    {
      path: 'user',
      select: 'username',
    },
    {
      path: 'hotel',
    },
  ]);

  const totalTransaction = await Transaction.count({});
  const totalPage = Math.ceil(totalTransaction / limit);

  res.status(200).json({
    data: listTransaction,
    page,
    totalPage,
    limit,
    totalTransaction,
  });
};

const userTransaction = async (req, res) => {
  const userId = req.params.userId;
  const userTransactions = await Transaction.find({ user: userId }).populate([
    {
      path: 'user',
      select: ['username'],
    },
    {
      path: 'hotel',
    },
  ]);
  res.status(200).json(userTransactions);
};

export { createTransaction, listTransaction, userTransaction };
