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

const usernameValidator = [
  validate({
    validator: "isLength",
    arguments: [3, 15],
    message: "Username must be between {ARGS[0]} and {ARGS[1]} characters."
  }),
  validate({
    validator: "matches",
    arguments: /^[A-Za-z][-_A-Za-z0-9]+$/,
    message:
      "Username must start with a letter and must not have special characters except - and _."
  })
];

const passwordValidator = [
  validate({
    validator: "isLength",
    arguments: [6, 20],
    message: "Password must be between {ARGS[0]} and {ARGS[1]} characters."
  })
];
const contactLength = [
  validate({
    validator: "isLength",
    arguments: 10,
    message: "contact length must be 10 digits"
  })
];

const FeedbackSchema = new mongoose.Schema({
  name: {
    type: String,
    validate: nameValidator,
    required: [true, "Name is required."],
  },
  email: {
    type: String,
    validate: emailValidator,
    required: [true, "Email is required."]

  },
  phone: {
    type: Number,
    required: [true, "Area is required."],
    unique: true,
    validate: contactLength
  },
  message: {
    type: String,
    required: [true, "Message is required."],
    validate: messageValidator
    
  },
});

// Use the unique validator plugin
FeedbackSchema.plugin(unique, { message: "That {PATH} is already taken." });

// Make the name capitalization consistent
FeedbackSchema.plugin(titlize, { paths: ["name"], trim: false });

const Feedback = (module.exports = mongoose.model("feedback", FeedbackSchema));
