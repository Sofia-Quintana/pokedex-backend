const express = require('express');
const router = express.Router();
const Joi = require('joi');
const userService = require('./user.service');
const validateRequest = require('../middleware/validate-request');

// routes

router.get('/:id', getById);
router.post('/', createSchema, create);
router.put('/:id', updateSchema, update);
router.post('/log-in', login);
router.put('/log-out/:id', logout);

module.exports = router;

// route functions

function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => res.json(user))
        .catch(next);
}

function login(req, res, next) {	
    userService.getById(req.body.nickname)
        .then(user => {
	        if(user.password === req.body.password) {
                userService.update(req.body.nickname, { isLogged: true });
                res.json({ message: 'User logged in'});
            } else {
                res.json({ message: 'Wrong nickname or password'});
            }
            ;
	})
        .catch(next);
}

function logout(req, res, next) {	
    userService.getById(req.params.id)
        .then(user => {
            userService.update(user.nickname, { isLogged: false });
            res.json({ message: 'User logged out'});
        })
        .catch(next);
}

function create(req, res, next) {
    userService.create(req.body)
        .then(() => res.json({ message: 'User created' }))
        .catch(next);
}

function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then(() => res.json({ message: 'User updated' }))
        .catch(next);
}

// schema functions

function createSchema(req, res, next) {
    const schema = Joi.object({
        nickname: Joi.string().required(),
        fullname: Joi.string().required(),
        password: Joi.string().required(),
        email: Joi.string().email().required(),
        region: Joi.string().valid().required(),
        gender: Joi.string().valid().required(),
        class: Joi.string().valid().required(),
        age: Joi.number().valid().required(),
        isLogged: Joi.boolean().valid(),
    });
    validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        nickname: Joi.string().empty(''),
        email: Joi.string().empty(''),
        password: Joi.string().empty(''),
        email: Joi.string().email().empty(''),
        region: Joi.string().valid().empty(''),
        gender: Joi.string().empty(''),
        class: Joi.string().valid().empty(''),
        age: Joi.number().valid().empty(''),
        isLogged: Joi.boolean().valid().empty('')
    });
    validateRequest(req, next, schema);
}