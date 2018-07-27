const express = require('express')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passport = require('passport')

const User = require('../../models/User')
const keys = require('../../config/keys').keys
const validateRegisterInput = require('../../validation/register')
const validateLoginInput = require('../../validation/login')
const router = express.Router()

// @route  POST api/users/register
// @desc   Register user
// @access Public
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body)
  //Check Validation
  if (!isValid) {
    return res.status(400).json(errors)
  }

  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        errors.email = 'Email already exists'
        return res.status(400).json(errors)
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: '200', // Size
          r: 'pg',  // Rating
          d: 'mm',  // Default
        })

        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          avatar,
          password: req.body.password
        })

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err
            newUser.password = hash
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err))
          })
        })
      }
    })
})

// @route  GET api/users/login
// @desc   Login User / Returning JWT Token
// @access Public
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body)
  //Check Validation
  if (!isValid) {
    return res.status(400).json(errors)
  }

  const email = req.body.email
  const password = req.body.password

    //Find user by email
  User.findOne({ email })
    .then(user => {
      // Check for users
      if (!user) {
        errors.email = 'User not found'
        return res.status(400).json(errors)
      }
      // Check password
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            // Define Payload
            const payload = {
              id: user.id,
              name: user.name,
              avatar: user.avatar
            }
            //Sign Token
            jwt.sign(
              payload,
              keys.secret,
              { expiresIn: 7000 },
              (err, token) => {
                res.json({
                  success: true,
                  token: 'Bearer ' + token
                })
              })
          } else {
            errors.email = 'Password incorrect'
            return res.status(400).json(errors)
          }
        })
    })
})

module.exports = router
