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
    college:{
        type: String,
        required: true,
    },
    dept:{
        type: String,
        enum: ["civil", "mechanical", "electrical", "ece","cse","it"],
        required:true,
    },
    year:{
        type: String,
        enum:["1st","2nd","3rd","4th"],
         required: true,
    },
    amount:{
        type: Number,
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
        enum:['event1','event2','both'],
        required: true,
    },
    payment:{//image
        type: String,
        required: true,
    },
    isVerified:{
        type: Boolean,
        default:false,
        required:true,
    }
   },{timestamps: true})

module.exports=mongoose.model("studentSchema", studentSchema);