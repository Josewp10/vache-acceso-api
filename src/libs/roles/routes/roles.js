const express = require('express');
const { RolesController } = require('../controllers/roles');
const { auth } = require('../../middlewares/authorization/authorization');
const {success, errorResponse} = require('../../utils/responses')
const Roles =require('../../../config/permissions');

const router = express.Router();
const _rolesController = new RolesController;

const {readRoles,readRole,createRole,updateRole,
  deleteRole,onlyOwnInfo,voidRole} = Roles.roles.roles;

router.get('/roles',/*auth(readRoles, voidRole),*/async (req, res) => {
    try {
      let resp = await _rolesController.readRoles();
      success(req, res, 'Roles', resp, 200);
      
    } catch (error) {
        errorResponse(req, res, 'ERROR', error);
    }

});

router.get('/roles/:role_id', /*auth(readRole, onlyOwnInfo), */async (req, res) => {
    let role_id = req.params.role_id;
    
    try {
      let resp = await _rolesController.readUserRoleById(role_id);
      success(req, res, 'Role', resp, 200);

    } catch (error) {
      errorResponse(req, res, 'ERROR', error);
    }
     
});

router.post('/roles', /*auth(createRole, voidRole), */async (req, res) => {
    try {
      let role_info = req.body;
  
      await _rolesController.createRole(role_info);
      success(req, res, 'Role created', null, 200);

    } catch (error) {
      errorResponse(req, res, error, 'ERROR');
    }
  });

router.delete("/roles/:role_id", /*auth(deleteRole, voidRole), */ async (req, res) => {
  let role_id = req.params.role_id;

  try {
    await _rolesController.deleteRole(role_id);
  success(req, res, 'Role deleted', null, 200);
  } catch (error) {
    errorResponse(req, res, error, 'ERROR');
  }  
});

router.put("/roles/:role_id", /*auth(updateRole, voidRole), */async (req, res) => {
  try {
    let role_id = req.params.role_id;
    let role_info = req.body;

    await _rolesController.updateRole(role_info, role_id);
    success(req, res, 'Role modified', null, 200);
    
  } catch (error) {
      errorResponse(req, res, error, 'ERROR');
  }
});
  
module.exports = router;