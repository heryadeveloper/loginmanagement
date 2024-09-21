const express = require('express');
const { signupguruValidation } = require('../validation');
const { signupcontroller, registrationController } = require('../controllers');
const validate = require('../middleware/validate');

const router = express.Router();

const routes = [
    { path: '/signupGuru', method: 'post', validation: signupguruValidation.createSignupguru, handler: signupcontroller.signup},
    { path: '/registration', method: 'post', validation: signupguruValidation.registrationGuru, handler: registrationController.registrationGuru},
    { path: '/all', method:'get', handler:registrationController.dataGuru},
    { path: '/signupSiswa', method: 'post', validation: signupguruValidation.createSignUpSiswa, handler: signupcontroller.signupSiswa},
];


routes.forEach(route => {
    const { path, method, validation, handler } = route;
    let middleware = null;
    if(validation){
        middleware = validate(validation);
    }
    
    if(middleware){
        router.route(path)[method](middleware, handler);
    }else{
        router.route(path)[method](handler);
    }
})



module.exports =router;
