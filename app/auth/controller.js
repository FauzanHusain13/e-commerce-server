const User = require("../user/model")
const config = require("../../config")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

module.exports = {
    signup: async(req, res, next) => {
      const payload = req.body;

      try {
        const user = new User(payload)

        await user.save();

        delete user._doc.password

        res.status(201).json({ data: user })
      } catch (err) {
        if(err && err.name === "ValidationError") {
          return res.status(422).json({
              error: 1,
              message: err.message,
              fields: err.errors
          })
        }
        next(err)
      }
    },
    signin: (req, res, next) => {
      const { email, password } = req.body;

      User.findOne({ email }).then((user) => {
          if(user) {
              const checkPassword = bcrypt.compareSync(password, user.password)

              if (checkPassword){
                  const token = jwt.sign({
                      user: {
                          id: user.id,
                          username: user.username,
                          email: user.email,
                      }
                  }, config.jwtKey)

                  res.status(200).json({
                      data: { token }
                  })
              } else {
                  res.status(403).json({
                      message: "password yang anda masukkan salah!"
                  })  
              }
          } else {
              res.status(403).json({
                  message: "email yang anda masukkan belum terdaftar!"
              })
          }
      }).catch((err) => {
          res.status(500).json({
              message: err.message || `Internal server error`
          })
          next()
      })
  }
}