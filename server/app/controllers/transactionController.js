import Transaction from "../models/transactionModel";
import Room from '../models/roomModel'

const createTransaction = async (req, res) => {
    console.log(req.body);
    //create transaction
    const newTransaction = await new Transaction({
        user: req.body.user,
        hotel: req.body.hotel,
        rooms: req.body.rooms,
        roomsNumber: req.body.roomsNumber,
        dateStart: req.body.dateStart,
        dateEnd: req.body.dateEnd,
        price: req.body.price,
        payment: req.body.payment,
        status: req.body.status,
    })

    //save to database
    const transaction = await newTransaction.save();
    req.body.rooms.map(roomId => {
        const room = Room.findById(roomId)

        [
            {
                roomNumberBooked: '101'
                
            },
            {
                roomNumberBooked: '201'
            }
        ]
        const roomsNumberBooked = req.body.roomsNumber.map(roomNumber => ({
            roomNumberBooked: roomNumber,
            dateStart: req.body.dateStart,
            dateEnd: req.body.dateEnd
        }))
    })

    //return data
    res.status(201).json(transaction);

}

const listTransaction = async (req, res) => {
    // const page = +req.query.page;
    // const limit = +req.query.limit;

    // const listHotel = await Hotel.find({}, {}, {
    //     limit,
    //     skip: (page - 1) * limit
    // })
    // const totalHotel = await Hotel.count({})
    // const totalPage = Math.ceil(totalHotel / limit)

    // res.status(200).json({
    //     data: listHotel,
    //     page,
    //     totalPage,
    //     limit,
    //     totalHotel
    // })
    const page = +req.query.page;
    const limit = +req.query.limit;

    const listTransaction = await Transaction.find({}, {}, {
        limit,
        skip: (page - 1) * limit
    }).populate([
        {
            path: 'user',
            select: 'username'
        },
        {
            path: 'hotel'
        }
    ])
    console.log(listTransaction)

    const totalTransaction = await Transaction.count({});
    const totalPage = Math.ceil(totalTransaction / limit)

    res.status(200).json({
        data: listTransaction,
        page,
        totalPage,
        limit,
        totalTransaction
    })
}

const userTransaction = async (req, res) => {

    const userId = req.params.userId;
    const userTransactions = await Transaction.find({ user: userId }).populate([
        {
            path: 'user',
            select: ['username']
        },
        {
            path: 'hotel',
        }
    ])
    console.log(userTransactions);
    res.status(200).json(userTransactions)
}

export { createTransaction, listTransaction, userTransaction };