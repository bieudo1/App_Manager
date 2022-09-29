const { identity } = require("lodash");
const { sendResponse, AppError}=require("../helpers/utils.js")

const Mission = require("../models/Mission.js")

const missionController={}

//Create a mission
missionController.createMission=async(req,res,next)=>{
    let {name,describe,status,Participants} = req.body;
    try{
    if(!name || !describe || !status ) throw new AppError(400,"Bad Request","Missing body info")
        const data = {name,describe,status,Participants}
        const created= await Mission.create(data)
        sendResponse(res,200,true,created,null,"Create Car  Success")
    }catch(err){
        next(err)
    }
}

//Get all mission
missionController.getAllMissions=async(req,res,next)=>{
    const allowedFilter = [
        "page",
        "name",
        "status",
        "createdAt",
        "updatedAt"
      ];
      try{
        let { page,...filterQuery } = req.query;
        const filterKeys = Object.keys(filterQuery);
        filterKeys.forEach((key) => {
        if (!allowedFilter.includes(key)) throw new AppError(401,"Bad Request",`Query ${key} is not allowed`) 
            if (!filterQuery[key]) delete filterQuery[key];
        });
        page = parseInt(page) || 0;
        const listOfFound= await Mission.find(filterQuery).limit(10).skip(10*page).populate("Participants")
        sendResponse(res,200,true,listOfFound,null,"Found list of missions success")
    }catch(err){
        next(err)
    }
}

// Get by id
missionController.getMissionsById = async(req,res,next)=>{
    const {id}= req.params
      try{
        let found = await Mission.findById(id).populate("Participants")
        if(!found) throw new AppError(404,"Bad Request","quest not found")
        sendResponse(res,200,true,found,null,"Successful Mission found")
    }catch(err){
        next(err)
    }
}

//Update a mission
missionController.updateMissionById=async(req,res,next)=>{
    const options = {new:true}
    try{
        const allowUpdate= [ "name","describe","status"]
        let {id} = req.params
        const updateInfo=req.body
        if(updateInfo.status){
            const testStatus = await Mission.findById(id)
            if(testStatus.status === "done" && updateInfo.status !== "archive" ) throw new AppError(401,"Bad Request","the completed state cannot be changed except for storage")
        }
        const updateKeys=Object.keys(updateInfo)
        const notAllow = updateKeys.filter(el=>!allowUpdate.includes(el));
        if(notAllow.length)throw new AppError(401,"Bad Request","Update field not allow")
        const updated= await Mission.findByIdAndUpdate(id,updateInfo,options)
        if(!updated) throw new AppError(404,"Bad Request","car not found")
        sendResponse(res,200,true,updated,null,"Update mission success")
    }catch(err){
        next(err)
    }
}

//Delete mission

missionController.deleteMissionById=async(req,res,next)=>{
    let {id} = req.params
    const deleted = {isDeleted:true}
    const options = {new:true}
    try{
        const updated= await Mission.findByIdAndUpdate(id,deleted,options)
        if(!updated) throw new AppError(404,"Bad Request","car not found")
        sendResponse(res,200,true,updated,null,"Delete mission success")
    }catch(err){
        next(err)
    }
}

//export
module.exports = missionController