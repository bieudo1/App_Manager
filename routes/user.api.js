const express= require("express")
const router = express.Router()
const {createUser, getAllUsers,addMissions,getUsersById,deleteMissions} = require("../controllers/user.controllers.js")

//Read
/**
 * @route GET api/user
 * @description get list of users
 * @access public
 */
 router.get("/",getAllUsers)

//Get By Id
 /**
 * @route GET API/users/:id
 * @description Get a user's task title by id
 * @access private
 */
  router.get("/:id",getUsersById)


//Create
/**
 * @route POST api/user
 * @description create a user
 * @access public
 */
 router.post("/",createUser)

//Update
/**
 * @route PUT api/user
 * @description update missions to a user
 * @access public
 */
 router.put("/:targetName",addMissions)

 //Update
/**
 * @route PUT api/user
 * @description update missions to a user
 * @access public
 */
 router.delete("/:targetName",deleteMissions)


 //export
 module.exports= router