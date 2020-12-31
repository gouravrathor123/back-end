const express = require('express');
const Employee = require('../models/Employee');
const router = new express.Router();

router.post('/employee', async (req,res) => {
    const employee = new Employee(req.body);

    try{
        await employee.save();
        const token = await employee.generateAuthToken();

        res.status(201).send({employee,token});
    }catch(error){
        res.status(400).send(error);
    }
});

module.exports = router;