/**
 * 
 */
var express=require('express')
var controller=require('../controllers/server.controller')
var router = express.Router()
router.get('/',controller.showmainpage)
router.post('/login', controller.login)
router.post('/register',controller.register)
module.exports = router