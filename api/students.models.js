const mongoose = require("mongoose");

const studentSchema= new mongoose.Schema({
        name:{
        type: String,
        required: true,
    },
    roll:{
        type: Number,
        required: true,
    },
    department:{
        type: String,
        enum: ["Civil Engineering", "Mechanical Engineering", "Electrical Engineering", "Electronics and Communication","Computer Science","Information Technology"],
        required:true,
    },
    year:{
        type: Number,
        enum:["1st Year","2nd Year","3rd Year","4th Year"],
         required: true,
    },
    phone:{
        type: Number,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    event:{
        type: String,
        enum:['Event 1','Event 2','Both(1+2)'],
        required: true,
    },
    payment:{//image
        type: String,
        required: true,
    },
   },{timestamps: true})

module.exports=mongoose.model("studentSchema", studentSchema);