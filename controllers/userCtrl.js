const User = require('../models/users')
const jwt = require('jsonwebtoken')

class UserCtrl {
  static register(req, res){
    var newUser = new User(req.body)
    newUser.save().then((dataUser) => {
      res.status(200).json({ message: 'Register Success!', dataUser })
    })
    .catch((err) => {
      res.status(404).send(err)
    })

  }

  static login(req, res){
    User.findOne({$or: [
      {email: req.body.email},
      {username: req.body.username}
    ]})
    .then((dataUser)=>{
      if(!dataUser){
        res.send('Unregistered Username, Please Register First!')
      }else {
        dataUser.comparePassword(req.body.password, (err, success) => {
          if (err || !success) {
            return res.status(200).json({
              message: 'Authentication failed, Username or password did not match'
            })
          }else {
            let payload = {
              userId: dataUser._id,
              email: dataUser.email,
              username: dataUser.username,
              fullname: dataUser.fullname
            }
            let token = jwt.sign(payload, process.env.SECRET)
            res.status(200).json({
              message:"Login Succes!",
              token: token
            })
          }
        })
      }
    })
    .catch(err => {
      console.log(err)
    })
  }

  static getProfile(req, res){
    res.json(req.decoded)
  }

}

module.exports = UserCtrl
