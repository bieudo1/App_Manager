const { sendResponse, AppError}=require("../helpers/utils.js")
const Mission = require("../models/Mission.js")

const User = require("../models/User.js")

const userController={}
//Create a user
userController.createUser=async(req,res,next)=>{
    let {name} = req.body;
    try{
        if(!name) throw new AppError(400,"Bad Request","Missing body info")
        const data = {name}
        const created= await User.create(data)
        sendResponse(res,200,true,created,null,"Create user Success")
    }catch(err){
        next(err)
    }
}

//updateuser
userController.addMissions=async(req,res,next)=>{
   const {idUser}= req.params
   const {id} = req.body
    try{
        let found = await User.findById(idUser)
        if(!found) throw new AppError(404,"Bad Request",`Can't find the name ${idUser}`)
        let idFound = await Mission.findById(id)
        if(!idFound) throw new AppError(404,"Bad Request","quest not found")
        if (found.missions.includes(id)){
            found.missions = found.missions.filter(e => e.toString() !== id)
            idFound.Participants = found.missions.filter(e => e.toString() !== idUser)
            idFound = await idFound.save()
            found = await found.save()
        }else{ 
        idFound.Participants.push(idUser)
        found.missions.push(idFound)
        idFound = await idFound.save()
        found = await found.save()}
        sendResponse(res,200,true,found,null,"Add Missions success")
    }catch(err){
        next(err)
    }
}

//updateuser
userController.deleteMissions=async(req,res,next)=>{
    let {id} = req.params
    const deleted = {isDeleted:true}
    const options = {new:true}
    try{
        const updated= await User.findByIdAndUpdate(id,deleted,options)
        if(!updated) throw new AppError(404,"Bad Request","car not found")
        sendResponse(res,200,true,updated,null,"Delete mission success")
    }catch(err){
        next(err)
    }
 }

//Get all user
userController.getAllUsers=async(req,res,next)=>{
    const allowedFilter = [
        "page",
        "name",
        "position"
      ];
      try{
        let { page,...filterQuery } = req.query;
        const filterKeys = Object.keys(filterQuery);
        filterKeys.forEach((key) => {
        if (!allowedFilter.includes(key)) throw new AppError(401,"Bad Request",`Query ${key} is not allowed`)
            if (!filterQuery[key]) delete filterQuery[key];
        });
        page = parseInt(page) || 0;
        const listOfFound= await User.find(filterQuery).limit(10).skip(10*page).populate("missions")
        sendResponse(res,200,true,listOfFound,null,"Found list of users success")
    }catch(err){
        next(err)
    }
}

// Get By Id
userController.getUsersById = async(req,res,next)=>{
    const {id}= req.params
    console.log(id)
      try{
        let found = await User.findById(id).populate("missions")
        if(!found) throw new AppError(404,"Bad Request","quest not found")
        sendResponse(res,200,true,found,null,"Successful user found")
    }catch(err){
        next(err)
    }
}

//export
module.exports = userController