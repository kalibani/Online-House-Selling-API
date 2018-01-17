const express = require('express')
const router = express.Router()
const user = require('../controllers/userCtrl')
const auth = require('../middlewares/Authorization')

router.post('/auth/register', user.register)
router.post('/auth/login', user.login)
router.post('/myprofile', auth.authorization, user.getProfile)

module.exports = router
