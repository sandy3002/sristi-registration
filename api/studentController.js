const express = require('express');
const router = express.Router(); 


const student=require("./students.models.js");

const registerStudent=async(req,res)=>{
    try{
        console.log('payload',req.body);
        const studentData=await student.create({
            name:req.body.name,
            roll:req.body.roll,
            dept:req.body.dept,
            year:req.body.year,
            phone:req.body.phone,
            email:req.body.email,
            event:req.body.event,
            payment:req.body.payment,
        }).then(async(studentData)=>{
            await studentData.save();
            res.status(200).json({
                message: "Student registered successfully",
            });
        })
        
    }
    catch(error){
          console.log('error',error);
          return res.status(500).json({
            message: "Server error",
        });  
    }
}

router.route('/').post(registerStudent);

module.exports=router;