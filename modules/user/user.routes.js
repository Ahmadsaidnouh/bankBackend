const router = require("express").Router();
const {
    updateBalance,
    getAllUsers,
    getUser,
    addUser
} = require("./controller/user.controller");
const validationFunc = require("../../middleware/validation");
const {
    updateBalanceValidation,
    getUserValidation
} = require("./user.validation");
const userModel = require("../../DB/models/user.model");


// apis start*************************
router.get("/",async (req,res) => {res.json({message:"hello"})})
router.post("/user/addUser", addUser)
router.get("/user/getAllUsers", getAllUsers);
router.get("/user/getUser", validationFunc(getUserValidation),getUser);
router.patch("/user/updateBalance", validationFunc(updateBalanceValidation),updateBalance);
// apis end*************************


module.exports = router;