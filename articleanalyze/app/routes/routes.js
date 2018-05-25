/**
 * 
 */
var express=require('express')
var controller=require('../controllers/server.controller')
var router = express.Router()
router.get('/',controller.showmainpage)
router.post('/login', controller.login)
router.post('/register',controller.register)
router.get('/initial',controller.initial)
router.get('/initial_draw',controller.initial_draw)
module.exports = router