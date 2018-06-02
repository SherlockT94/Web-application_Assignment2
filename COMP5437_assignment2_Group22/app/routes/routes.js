/**
 * 
 */
var express=require('express')
var controller=require('../controllers/server.controller')
var router = express.Router()
router.get('/',controller.showmainpage)
router.post('/login', controller.login)
router.post('/register',controller.register)
router.post('/article_detail',controller.article_detail)
router.post('/article_draw',controller.article_draw)
router.post("/top5_data",controller.top5_data)
router.post("/author_detail",controller.author_detail)
router.post("/author_title",controller.author_title)
router.post("/update",controller.update)
router.get('/initial',controller.initial)
router.get('/initial_draw',controller.initial_draw)
router.get('/initial_individual',controller.initial_individual)
router.get('/initial_author',controller.initial_author)

module.exports = router