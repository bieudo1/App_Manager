const express= require("express")
const router = express.Router()
const {createMission, getAllMissions, updateMissionById,getMissionsById ,deleteMissionById} = require("../controllers/mission.controllers.js")

//Read
/**
 * @route GET api/mission
 * @description get list of missions
 * @access public
 */
 router.get("/",getAllMissions)

 //Get By Id
/**
 * @route GET api/mission
 * @description Get a missions task title by id
 * @access public
 */
 router.get("/:id",getMissionsById)

//Create
/**
 * @route POST api/mission
 * @description create a mission
 * @access public
 */
 router.post("/",createMission)

//Update
/**
 * @route PUT api/mission
 * @description update a mission
 * @access public
 */
 router.put("/:id",updateMissionById )

//Delete
/**
 * @route DELETE api/mission
 * @description delet a mission
 * @access public
 */
 router.delete("/:id",deleteMissionById)

 module.exports= router