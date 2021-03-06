// express router imports
const extractToken = require("../extract.js")
const express = require('express')
const router = express.Router()

// for profile picture uploads. Cloudinary stuff with multer for body parsing
const dotenv = require('dotenv')
const multer = require("multer")
const cloudinary = require("cloudinary")
const cloudinaryStorage = require("multer-storage-cloudinary")
const md5File = require("md5-file")
var formidable = require('formidable')

// imports for mongo
const mongoConfig = require("../../database/MongoConfig")
const { User, Jump, Run, Swim } = mongoConfig
const mongoose = require('mongoose')

// other modules and constants
const async = require("async")
const jwt = require("jsonwebtoken")
const secret = 'secretkey'

function sendError(res, err) {
  return res.send({
    success: false,
    message: err.toString(),
  })
}

// gets all the user info that is stored in the document in mongo
router.get("/getUserInfo", extractToken, (req, res, next) => {
  const projection = { _id: 0, __v: 0, password: 0, productCode: 0, registered: 0, registerDate: 0 }
  //verify token
  var userID;
  jwt.verify(req.token, secret, (err, decoded) => {
    if (err) {
      throw err
      sendError(res, err)
    }
    userID = decoded
    // query for the user's firstname, lastname, friends, and friend requests
    User.findOne(
      {"_id": userID},
      projection,
    )
    .exec((err, results) => {
      if (err) {
        throw err
        sendError(res, err)
      }
      return res.send({
        success: true,
        message: "got request",
        ...results._doc
      })
    })
  })
})

/**
 * Find the user with the associated ID and get their bests object
 * for displaying a user's friends' bests
 */
router.post("/getBests", (req, res) => {
  const projection = { bests: 1 }
  var { id } = req.body
  User.findOne(
    {"_id": id},
    projection,
  )
  .exec((err, results) => {
    if (err) {
      throw err
      sendError(res, err)
    } else if (!results) {
      var userNotFoundError = new Error("couldn't find the user with this id")
      sendError(res, userNotFoundError)
    }
    return res.send({
      success: true,
      ...results._doc
    })
  })
})

router.post("/getUsername", (req, res) => {
  const projection = { username: 1 }
  var { id } = req.body
  User.findOne(
    {"_id": id},
    projection,
  )
  .exec((err, results) => {
    if (err) {
      throw err
      sendError(res, err)
    } else if (!results) {
      var userNotFoundError = new Error("couldn't find the user with this id")
      sendError(res, userNotFoundError)
    }
    return res.send({
      success: true,
      ...results._doc
    })
  })
})

router.post("/updateProfile", (req, res) => {
  var { userToken, firstName, lastName, bio, gender, height, weight, location } = req.body

  // decode user token
  var userID;
  jwt.verify(userToken, secret, (err, decoded) => {
    if (err) {
      return sendError(res, err)
    }
    userID = decoded._id
  })

  // update database with new profile changes
  User.findOneAndUpdate(
    {"_id": userID},
    {
      firstName,
      lastName,
      bio,
      gender,
      height,
      weight,
      location,
    }
  ).exec((err, results) => {
    if (err) {
      return sendError(res, err)
    } else {
      res.send({ success: true })
    }
  })
})

router.get("/tokenToID", extractToken, (req, res, next) => {
  jwt.verify(req.token, secret, (err, decoded) => {
    if (err) {
      throw err
      sendError(res, err)
    } else {
      return res.send({
        success: true,
        userID: decoded._id
      })
    }
  })
})

module.exports = router
