const userModel = require("../../../DB/models/user.model");
const transferModel = require("../../../DB/models/transfer.model");

const addTransfer = async (req, res) => {
    let { fromUserId, toUserId, amount } = req.body;
    try {
        const fromUser = await userModel.findOne({ _id: fromUserId });
        if (fromUser) {
            try {
                const toUser = await userModel.findOne({ _id: toUserId });
                if (toUser) {
                    const createTransfer = new transferModel({ fromUserId, toUserId, amount });
                    const addedTransfer = await createTransfer.save();
                    res.json({ message: "Done", addedTransfer });
                }
                else {
                    res.status(400).json({ message: "No user with such email to transfer to!!" })
                }
            } catch (error) {
                res.status(400).json({ message: "No user with such email to transfer to!!" })

            }
        }
        else {
            res.status(400).json({ message: "No user with such email to transfer from!!" })
        }
    } catch (error) {
        res.status(400).json({ message: "No user with such email to transfer from!!" })
    }
}

const getUserTransfers = async (req, res) => {
    let { userId } = req.params;
    try {
        const user = await userModel.findOne({ _id: userId });
        if (user) {
            const transferedByYou = await transferModel.find({ fromUserId: userId }).populate([{
                path: "fromUserId",
                model: "user",
                select: "email"
            }, {
                path: "toUserId",
                model: "user",
                select: "email"
                
            }]);
            const transferedToYou = await transferModel.find({ toUserId: userId }).populate([{
                path: "fromUserId",
                model: "user",
                select: "email"
            }, {
                path: "toUserId",
                model: "user",
                select: "email"
                
            }]);
            res.json({ message: "Done", transferedByYou, transferedToYou });
        }
        else {
            res.status(400).json({ message: "No user with such email!!" })
        }
    } catch (error) {
        res.status(400).json({ message: "No user with such email!!" })

    }
}

module.exports = {
    addTransfer,
    getUserTransfers
}