const mongoose = require("mongoose");
const titlize = require("mongoose-title-case");
const unique = require("mongoose-unique-validator");
const validate = require("mongoose-validator");
const bcrypt = require("bcrypt-nodejs");
const config = require("../config/secret");

const nameValidator = [
  validate({
    validator: "isLength",
    arguments: [0, 40],
    message: "Name must not exceed {ARGS[1]} characters."
  })
];

const messageValidator = [
  validate({
    validator: "isLength",
    arguments: [0, 250],
    message: "Name must not exceed {ARGS[1]} characters."
  })
];

const emailValidator = [
  validate({
    validator: "isLength",
    arguments: [0, 40],
    message: "Email must not exceed {ARGS[1]} characters."
  }),
  validate({
    validator: "isEmail",
    message: "Email must be valid."
  })
];

const contactLength = [
  validate({
    validator: "isLength",
    arguments: 10,
    message: "contact length must be 10 digits"
  })
];

const workerSchema=new mongoose.Schema({
  name:{
    type:String,
    validate: nameValidator,
    required:[true,"No name specified"]
  },
  email:{
    type:String,
    validate:emailValidator,
    required:[true,"No email specified"]
  },
  location:String,
  phone:{
    type:String,
    validate: contactLength,
    required:[true,"No password specified"]
  },
  role:{
    type:String,
    required:[true,"No service specified"]
  },
  price:String
});
// Use the unique validator plugin
workerSchema.plugin(unique, { message: "That {PATH} is already taken." });

// Make the name capitalization consistent
workerSchema.plugin(titlize, { paths: ["name"], trim: false });

const Worker = (module.exports = mongoose.model("workers", workerSchema));
