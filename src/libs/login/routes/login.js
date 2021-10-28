const express = require('express');
const router = express.Router();

const {success, errorResponse} = require('../../utils/responses');
const LoginController = require('../controllers/login');
const _loginController = new LoginController;

router.post('/login', async (req,res)=>{
    try {
        let user = req.body;
        let token = await _loginController.processLogin(user)
        success(req, res, 'Access granted', token)
    } catch (error) {
        errorResponse(req, res, 'ERROR', error);
    }
});

module.exports=router;