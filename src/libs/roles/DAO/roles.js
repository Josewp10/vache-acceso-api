/**
 * Controller in charge of validate the requests to the database
 * to manage users
 */

//Requiring all dependencies and services
const config = require('config');

const ServicePg = require('../../../database/postgress');
const _service = new ServicePg(config.get('DB'));

class RolesDao{

  /**
   * @description Brings the data of all registered roles on the DB.
   * @returns 
   */
  async readRoles(){
      let sql = `SELECT role_id, role_name
            FROM public."Roles"
            order by  role_id asc;`;
      let response = await _service.executeSQL(sql);
      return response;
  };

/**
   * @description Brings the data of a registered role on the DB.
   * @param {Integer} role_id 
   * @returns 
   */
  async readRoleNameById(role_id){
        let sql = `SELECT role_name
                FROM public."Roles"
                WHERE role_id = $1;`;
        let response = await _service.executeSQL(sql, [role_id]);
        return response;
  }

  /**
   * @description Brings the data of a registered role on the DB.
   * @param {String} role_id 
   * @returns 
   */
   async readIdRoleByName(role_name){
    let sql = `SELECT role_id
              FROM public."Roles"
              WHERE role_name like $1;`;
    let response = await _service.executeSQL(sql, [role_name]);
    return response;
  }

  /**
   * @description Create a new role on the DB.
   * @param {Object} role 
   * @returns 
   */
  async createRole(role){
      
      let sql = `INSERT INTO public."Roles"(role_name) VALUES ($1);`;
      let values = [role.role_name];
      let response = await _service.executeSQL(sql, values);
      return response;
  };

  /**
   * @description Modifies role's data on the database.
   * @param {Object} role
   * @returns 
   */
  async updateRole(role){

      let sql =  `UPDATE public."Roles"
                SET role_name=$1
                WHERE role_id=$2;`;
      let values = [role.role_name, role.role_id];
      await _service.executeSQL(sql, values);
    };

  /**
   * @description Deletes a role from the database.
   * @param {String} role_id 
   * @returns
   */
  async deleteRole(role_id){
      let sql = `DELETE FROM public."Roles" where role_id = $1;`;    
      let response = await _service.executeSQL(sql, [role_id]);
      return response;
  };
}

module.exports = {RolesDao};