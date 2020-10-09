const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const ShoppingList = require('../database/models/shoppingList');


/**
 * ROUTE:           /api/shoppinglists
 * METHOD:          GET
 * AUTHENTICATION:  YES (auth-token header)
 */
router.get('/', (req, res) => {
    const user = req.user;

    ShoppingList.find({ ownerId: user._id })
                .select({ 
                    name: true,
                    description: true,
                    dateCreated: true
                 })
                
                .then(data => {
                    res.status(200).json({
                        success: true,
                        data
                    });
                })

                .catch(err => {
                    res.status(200).json({
                        success: false,
                        reason: err.message
                    });
                });
});


/**
 * ROUTE:           /api/shoppinglists/:id
 * METHOD:          GET
 * AUTHENTICATION:  YES (auth-token header)
 */
router.get('/:id', (req, res) => {
    const user = req.user;

    ShoppingList.findById(req.params.id)

        .then(data => {
            if(!data.ownerId.equals(user._id)) {
                return res.status(401).json({
                    success: false,
                    reason: 'This account is not authorized to access this shoppinglist.'
                });
            }

            res.status(200).json({
                success: true,
                data
            });
        })

        .catch(err => {
            res.status(500).json({
                success: false,
                reason: err.message
            });
        });
});


/**
 * ROUTE:           /api/shoppinglists/create
 * METHOD:          POST
 * AUTHENTICATION:  YES (auth-token header)
 * BODY:            { shoppingList object }
 */
router.post('/create', (req, res) => {
    const userId = req.user._id;
    
    const newList = new ShoppingList({
        ...req.body,
        ownerId: mongoose.Types.ObjectId(userId)
    });

    newList.save()
           .then(data => {
               res.json(data);
           })
           .catch(err => {
               res.status(500).json({
                   success: false,
                   error: err.message
               });
           });
});


/**
 * ROUTE:           /api/shoppinglists/update
 * METHOD:          POST
 * AUTHENTICATION:  YES (auth-token header)
 * BODY:            { id: idOfList, list: shoppingList object }
 */
router.post('/update', (req, res) => {
    const userId = req.user._id;
    const { id, list } = req.body;

    ShoppingList.findById(id)

                .then(foundList => {
                    if(!foundList) {
                        return res.status(404).json({
                            success: false,
                            reason: 'Not found'
                        });
                    }

                    if(!foundList.ownerId.equals(userId)) {
                        return res.status(401).json({
                            success: false,
                            reason: 'Shopping list not accessible for this user.'
                        });
                    }

                    foundList.name = list.name;
                    foundList.description = list.description;
                    foundList.shoppingItems = list.shoppingItems || foundList.shoppingItems;

                    foundList.save()
                             .then(savedList => {
                                return res.json(savedList);
                             })
                             .catch(err => {
                                return res.status(500).json({
                                    success: false,
                                    reason: err.message
                                });            
                             });
                })

                .catch(err => {
                    return res.status(500).json({
                        success: false,
                        reason: err.message
                    });
                });
});


/**
 * ROUTE:           /api/shoppinglists/update
 * METHOD:          POST
 * AUTHENTICATION:  YES (auth-token header)
 * BODY:            { id: idOfList }
 */
router.post('/delete', (req, res) => {
    const userId = req.user._id;
    const { id } = req.body;

    ShoppingList.findById(id)

                .then(foundList => {
                    if(!foundList) {
                        return res.status(404).json({
                            success: false,
                            reason: 'Not found'
                        });
                    }

                    if(!foundList.ownerId.equals(userId)) {
                        return res.status(401).json({
                            success: false,
                            reason: 'Shopping list not accessible for this user.'
                        });
                    }

                    foundList.deleteOne()
                             .then(result => {
                                 return res.json(result);
                             })
                             .catch(err => {
                                 return res.status(401).json({
                                     success: false,
                                     err: err.message
                                 });
                             })
                })

                .catch(err => {
                    return res.status(500).json({
                        success: false,
                        reason: err.message
                    });
                });
});

module.exports = router;