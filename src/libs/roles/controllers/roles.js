
const {RolesDao} = require("../DAO/roles");
const _rolesDao = new RolesDao;

const {Bcrypt} = require('../../utils/bcrypt');
const _bcrypt = new Bcrypt;

class RolesController {

      /**
   * @description The role information param is taken and it validates:
   *  - Not null values
   *  - Containing the fields: role_id, role_name
   * @param {Object} Role 
   */
    validateRole(role){
        if (!role) {
            throw 'Enter role information';
        }else if(!role.role_name){
            throw 'Enter role name';
        }
    };

    async readRoles(){
        let answerDB = await _rolesDao.readRoles();
        return answerDB.rows;
    }

    async readRoleNameById(role_id){
        let answerDB = await _rolesDao.readRoleNameById(role_id);
        return answerDB.rows;
    }

    async readIdRoleByName(role_name){
        let answerDB = await _rolesDao.readIdRoleByName(role_name);
        return answerDB.rows;
    }

    async createRole(role){
        this.validateRole(role);
        
        let answerDB = await _rolesDao.createRole(role)
        return answerDB;
    }

    async updateRole(role, role_id){
        if (role.role_id != role_id) {
            throw  "Role ID and provided ID doesn't match";
        }
        await _rolesDao.updateRole(role);
    }

    async deleteRole(role_id){
        let answerDB = await _rolesDao.deleteRole(role_id);
        return answerDB;
    }


}

module.exports={RolesController}