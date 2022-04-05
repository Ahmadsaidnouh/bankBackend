const router = require("express").Router();
const {
    addTransfer,
    getUserTransfers
} = require("./controller/transfer.controller");
const validationFunc = require("../../middleware/validation");
const {
    addtransferValidation,
    getUserTransfersValidation
} = require("./transfer.validation");
const transferModel = require("../../DB/models/transfer.model");


// apis start*************************
router.post("/transfer/addUser", async(req, res) => {
    let {fromUserId, toUserId, amount} = req.body;
    const user = await transferModel.insertMany({fromUserId, toUserId, amount});
    res.json({message:"done", user});
})
router.get("/transfer/getUserTransfers", validationFunc(getUserTransfersValidation),getUserTransfers);
// router.get("/transfer/getUser", validationFunc(getUserValidation),getUser);
router.post("/transfer/addTransfer", validationFunc(addtransferValidation),addTransfer);
// apis end*************************


module.exports = router;