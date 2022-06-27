const Event = require('../models/Event');
const Karaoke = require('../models/Karaoke');

//Get All Events
const getAllEvent = async (req, res) =>{
    try {
        const data = await Event.find({})
        res.status(200).json(data.reverse())
    } catch (error) {
        res.status(500).json({message: error})
    }
}


//create Event
const createEvent = async (req, res) =>{
    try {
        const data = await Event.create(req.body);
        res.status(201).json({data})
    } catch (error) {
        res.status(500).json({message: error})
    }
}


//Get One Event
const getOneEvent = async (req, res) =>{
    try {
        const {itemID} = req.params;
        const data = await Event.find({_id:itemID})

        if(!data){
            res.status(404).json({message: 'Ohh This Item does not exist'})
        }

        res.status(200).json({data})
    } catch (error) {
        res.status(500).json({message: error})
    }
}

//Update Event
const updateEvent = async (req, res) =>{
    try {
        const {itemID} = req.params;
        const data = await Event.findByIdAndUpdate({_id:itemID}, req.body, {
            new: true,
            runValidators: true
        })

        if(!data){
            res.status(404).json({message: 'Ohh This Item does not exist'})
        }

        res.status(200).json({data})
    } catch (error) {
        res.status(500).json({message: error})
    }
}

//Delete Event
const deleteEvent = async (req, res) =>{
    try {
        const {itemID} = req.params;
        const data = await Event.findByIdAndDelete({_id:itemID})

        if(!data){
            res.status(404).json({message: 'Ohh This Item does not exist'})
        }

        res.status(200).json({data})
    } catch (error) {
        res.status(500).json({message: error})
    }
}




//Get All Karaoke
const getAllKaraoke = async (req, res) =>{
    try {
        const data = await Karaoke.find({})
        res.status(200).json(data.reverse())
    } catch (error) {
        res.status(500).json({message: error})
    }
}


//create Karaoke
const createKaraoke = async (req, res) =>{
    try {
        const data = await Karaoke.create(req.body);
        res.status(201).json({data})
    } catch (error) {
        res.status(500).json({message: error})
    }
}


//Get One Karaoke
const getOneKaraoke = async (req, res) =>{
    try {
        const {itemID} = req.params;
        const data = await Karaoke.find({_id:itemID})

        if(!data){
            res.status(404).json({message: 'Ohh This Item does not exist'})
        }

        res.status(200).json({data})
    } catch (error) {
        res.status(500).json({message: error})
    }
}

//Update Karaoke
const updateKaraoke = async (req, res) =>{
    try {
        const {itemID} = req.params;
        const data = await Karaoke.findByIdAndUpdate({_id:itemID}, req.body, {
            new: true,
            runValidators: true
        })

        if(!data){
            res.status(404).json({message: 'Ohh This Item does not exist'})
        }

        res.status(200).json({data})
    } catch (error) {
        res.status(500).json({message: error})
    }
}

//Delete Karaoke
const deleteKaraoke = async (req, res) =>{
    try {
        const {itemID} = req.params;
        const data = await Karaoke.findByIdAndDelete({_id:itemID})

        if(!data){
            res.status(404).json({message: 'Ohh This Item does not exist'})
        }

        res.status(200).json({data})
    } catch (error) {
        res.status(500).json({message: error})
    }
}

//export functions
module.exports = {
    getAllEvent, createEvent, getOneEvent, updateEvent, deleteEvent, getAllKaraoke, createKaraoke, getOneKaraoke, updateKaraoke, deleteKaraoke
}
