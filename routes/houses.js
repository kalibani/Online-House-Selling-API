const express = require('express')
const router = express.Router()
const house = require('../controllers/houseCtrl')
const auth = require('../middlewares/Authorization')
const helper = require('../helpers/imageHelpers')

router.get('/',  house.getHouse)
router.get('/:id',  house.getHousebyId)
router.post('/create', auth.authorization,
  helper.multer.single('image'),
  helper.sendUploadToGCS,
  house.createHouse
)
router.put('/update/:id', auth.authorization,
  helper.multer.single('image'),
  helper.sendUploadToGCS,
  house.updateHouse
)
router.delete('/:id', auth.authorization, house.deleteHouse)

module.exports = router
