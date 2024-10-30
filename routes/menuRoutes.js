const express = require('express');
const router = express.Router();
const MenuItem = require('./../models/menu');

router.post('/', async (req, res) => {
    try{
        const data = req.body // assuming the request body contains the menu data

        //create a menu items document/model and an object Menu using the mongoose model
        const Menu = new MenuItem(data);
    
        //save the Menu to the database
        const response = await Menu.save();
        console.log('data saved');
        res.status(200).json(response);  
    }
    
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }

})

router.get('/', async (req, res) =>{
    try{
        const data = await MenuItem.find();
        console.log('data fetched');
        res.status(200).json(data); 
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
});

router.put('/:taste', async(req, res) => {
    try{
        const menuTaste = req.params.taste;
        const updatedMenuItem = req.body;

        const response = await MenuItem.findByIdAndUpdate(menuTaste, updatedMenuItem, {
            new: true,
            runValidators: true
        });

        if(!response){
            res.status(404).json({error: 'Item not found'});
        }

        console.log('data updated');
        res.status(500).json(response);

    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
})

router.delete('/:taste', async(req, res) => {
    try{
        const menuTaste = req.params.taste;

        const response = await MenuItem.findByIdAndDelete(menuTaste);

        if(!response){
            res.status(404).json({error: 'Item not found'});
        }

        console.log('data deleted');
        res.status(500).json(response);

    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
})

module.exports = router;