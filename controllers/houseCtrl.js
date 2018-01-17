const House = require('../models/houses');

class HouseAPI {
  static getHouse(req, res){
    House.find()
    .populate('pemilik')
    .then((dataHouse) => {
      res.status(200).json(dataHouse)
    })
    .catch((err) => {
      res.status(404).send(err)
    })
  }

  static createHouse(req, res){
    req.body.image = req.file.cloudStoragePublicUrl
    var newHouse = new House({
      nama: req.body.nama,
      pemilik: req.decoded.userId,
      lokasi: req.body.lokasi,
      harga: req.body.harga,
      image: req.body.image,
      detail: req.body.detail
    })
    newHouse.save()
    .then((data) => {
      if (data) {
        res.status(200).json({ message: 'House Succesfully Added!', data })
      } else {
        res.status(200).json({ message: 'Failed Added House!'})
      }
    })
    .catch((err) => {
      res.status(500).send(err)
    })
  }

  static getHousebyId(req, res){
    House.findById(req.params.id)
    .populate('pemilik')
    .then((data) => {
      res.status(200).json(data)
    })
    .catch((err) => {
      res.status(404).send(err)
    })
  }

  static updateHouse(req, res) {
    if (req.file) {
      req.body.image = req.file.cloudStoragePublicUrl
      House.findById(req.params.id).then((data) => {
        if (data.pemilik == req.decoded.userId) {
          data.nama = req.body.nama
          data.lokasi = req.body.lokasi
          data.harga = req.body.harga
          data.image = req.body.image
          data.detail = req.body.detail
          data.save().then(updatedHouse => {
            res.status(200).json({message: 'Update Success', data: updatedHouse})
          }).catch(err => {
            res.status(500).send(err)
          })
        }else {
          res.status(403).send('Forbidden')
        }
      })
    } else {
      let id = {_id : req.params.id}
      let update = {
        nama : req.body.nama,
        lokasi : req.body.lokasi,
        harga : req.body.harga,
        detail : req.body.detail
      }
      House.findByIdAndUpdate(id, update,{
        new: true, // return new updated document
      })
      .then(data => {
        res.status(200).json({
          message: 'Update Succes!',
          data: data
        })
      })
      .catch(err => res.send(err))
    }

  }

  static deleteHouse(req, res){
    House.findById(req.params.id).then(data => {
      if (data.posted_by == req.decoded.userId) {
        data.remove().then(result => {
          res.status(200).json({ message: "House successfully deleted!", data: result })
        }).catch(err => {
          res.status(500).send(err)
        })
      }else {
        res.status(403).send('Forbidden')
      }
    })
  }

}

module.exports = HouseAPI
