const express = require('express')
const router = express.Router();

//Destructuring
const {getAllEvent, createEvent, getOneEvent, updateEvent, deleteEvent, getAllKaraoke, createKaraoke, getOneKaraoke, updateKaraoke, deleteKaraoke} = require('../controllers/CrudController')

//Routing Event
router.route('/Events').get(getAllEvent)
router.route('/addEvent').post(createEvent)
router.route('/Events/:itemID').get(getOneEvent)
router.route('/update/:itemID').patch(updateEvent)
router.route('/delete/:itemID').delete(deleteEvent)
//Routing karaoke
router.route('/Karaokes').get(getAllKaraoke)
router.route('/addKaraoke').post(createKaraoke)
router.route('/Karaokes/:itemID').get(getOneKaraoke)
router.route('/updateKaraoke/:itemID').patch(updateKaraoke)
router.route('/deleteKaraoke/:itemID').delete(deleteKaraoke)
module.exports = router;