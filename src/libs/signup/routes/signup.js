const express = require('express');
const router = express.Router();
const {success, errorResponse} = require('../../utils/responses');
const SignUpController = require('../controllers/signup');
const _signUpController = new SignUpController;

router.post('/signup', async (req,res)=>{
    try {
        let user = req.body;
        await _signUpController.processSignUp(user);
        success(req, res, 'Welcome', null);
    } catch (error) {
        errorResponse(req, res, 'ERROR', error);
    }
});

module.exports=router;