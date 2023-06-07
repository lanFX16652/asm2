import Transaction from "../models/transactionModel";

const createTransaction = async (req, res) => {
    
    //create transaction
    const newTransaction = await new Transaction({
        user: req.body.user,
        hotel: req.body.hotel,
        room: req.body.room,
        roomNumber: req.body.roomNumber,
        dateStart: req.body.dateStart,
        dateEnd: req.body.dateEnd,
        price: req.body.price,
        payment: req.body.payment,
        status: req.body.status,
    })

    //save to database
    const transaction = await newTransaction.save();

    //return data
    res.status(201).json(transaction);

}

export { createTransaction };