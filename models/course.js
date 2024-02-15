const mongoose = require("mongoose");

// field

const CourseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      Require: true,
    },
    email: {
      type: String,
      Require: true,
    },
    password: {
      type: String,
      Require: true,
    },
    phone: {
      type: String,
      Require: true,
    },
    dob: {
      type: String,
      Require: true,
    },
    address: {
      type: String,
      Require: true,
    },
    gender: {
      type: String,
      Require: true,
    },
    education: {
      type: String,
      Require: true,
    },
    course: {
      type: String,
      Require: true,
    },
    user_id: {
      type: String,
      Require: true,
    },
    status:{
      type:String,
      default:"Panding"
    },
    comment:{
      type:String,
      default:"Panding"
    },

  },
  { timestamps: true }
);

// modell
const CourseModel = mongoose.model("course", CourseSchema);

module.exports = CourseModel;
