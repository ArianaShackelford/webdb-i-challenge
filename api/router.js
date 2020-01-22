const express = require('express');
const db = require('../data/dbConfig.js');

const router = express.Router();


//create new account

router.post('/',(req, res) => {
   const accountData = req.body;
    
    db("accounts")
    .insert(accountData)
    .then(newId => {
        db("accounts")
        .where({ id : newId[0]})
        .then(newAccount => {
            res.status(201).json(newAccount)
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({message: "We ran into an issue creating that account"})
    });
    
    })

//get all accounts

router.get('/', (req, res, next) => {
    db("accounts")
    .then(accounts => {
        res.json(accounts)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({message: "we ran into an issue fetching accounts"})
    })
})

//get account by id

router.get('/:id', (req, res) => {
    const { id } = req.params;

    db("accounts").where({ id })
    .then(accounts => {
        if(accounts.length){
            res.json(accounts)
        }else{
            res.status(404).json({message: "Could not find account with specified user id"})
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({message: "We ran into a problem fetching that account"})
    })
})

//update account

router.put('/:id', (req, res) => {
    const accountUpdate = req.body;
    
    db("accounts")
    .update(accountUpdate)
    .then(id => {
        db("accounts")
        .where({ id : id[0]})
        .then(updatedAccount => {
            res.status(201).json(updatedAccount)
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({message: "We ran into an issue creating that account"})
    });
    
    })


//delete account

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    const changes = req.body;

    db("accounts")
    .where({ id })
    .delete(changes)
    .then(count => {
        if(count > 0){
            res.status(201).json({message: `${count} record(s) deleted`})
        }else{
            res.status(404).json({message: "account could not be found"})
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({message: "There was an issue processing your request"})
    })
})

module.exports = router;