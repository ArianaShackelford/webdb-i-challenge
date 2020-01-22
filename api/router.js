const express = require('express');
const db = require('../data/dbConfig.js');

const router = express.Router();


//create new account

router.post('/', async (req, res, next) => {
try{
    const payload = {
        name : req.body.name,
        budget : req.body.budget
    }
    const [id] = await db("accounts").insert(payload);
    res.json(await db("accounts").where("id", id).select())
} catch(err) {
    next(err)
}
})

//get all accounts

router.get('/', async (req, res, next) => {
    try{
        res.json(await db("accounts").select());

    } catch(err) {
        next(err);
    }
})

//get account by id

router.get('/:id', async (req, res, next) => {
    try{
       res.json(await db("accounts").where(id = req.params.id).select())
    } catch(err) {
        next(err);
    }
})

//update account

router.put('/:id', async (req, res, next) => {
    try{
        const payload = {
            name : req.body.name,
            budget : req.body.budget
        }
        const id = req.param.id
        await db("accounts").where("id", req.params.id).update(payload);
        res.json(await db("accounts").where("id", id).first())
    } catch(err) {
        next(err);
    }
})

//delete account

router.delete('/', async (req, res, next) => {
    try{

    } catch(err) {
        next(err);
    }
})

module.exports = router;