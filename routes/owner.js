const express = require('express');
const Owner = require('../models/Owner');
const router = new express.Router();

router.post('/owner', async (req,res) => {
    const owner = new Owner(req.body);

    try{
        await owner.save();
        const token = await owner.generateAuthToken();

        res.status(201).send({owner,token});
    }catch(error){
        res.status(400).send(error);
    }
});

module.exports = router;