const express = require('express');
const router = express.Router();
const Person = require('./../models/person');

router.post('/', async (req, res) => {
    try{
        const data = req.body // assuming the request body contains the person data

        //create a new person document/model and an object newPerson using the mongoose model
        const newPerson = new Person(data);
    
        //save the new person to the database
        const response = await newPerson.save();
        console.log('data saved');
        res.status(200).json(response);  
    }
    
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }

})

//GET method to get the person data from the database
router.get('/', async (req, res) =>{
    try{
        const data = await Person.find();
        console.log('data fetched');
        res.status(200).json(data); 
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
});

router.get('/:workType', async (req, res) => {
    try {

        const workType = req.params.workType; // Extract the work type from the URL parameter
    
        if (workType == 'chef' || workType == 'manager' || workType == 'waiter'){
            // Assuming you already have a Person model and MongoDB connection set up
            const response = await Person.find({ work: workType });
  
            // Send the list of persons with the specified work type as a JSON response
            res.status(200).json(response);

        }else{
            res.status(404).json({error: 'Invalid work type'});
        }


    } 
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/:id', async(req, res)=>{
    try{
        const personId = req.params.id; //Extract the id from the URL parameter
        const updatedPersonData = req.body;  //updated data for the person

        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true,  //return the updated document
            runValidators: true,  //run mongoose validation
        })

        if (!response) {
            return res.status(404).json({ error: 'Person not found' });
        }
        
        console.log('data fetched');
        res.status(200).json(response);

    }catch(err){
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });

    }
})

router.delete('/:id', async(req, res)=>{
    try{
        const personId = req.params.id; //Extract the id from the URL parameter

        //assumong you have a person model
        const response = await Person.findByIdAndDelete(personId);
        if (!response) {
            return res.status(404).json({ error: 'Person not found' });
        }

        console.log('data deleted');
        res.status(200).json(response);

    }catch(err){
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
})

//comment added for testing purposes
module.exports = router;