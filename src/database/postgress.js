const {pool, Pool} = require('pg');
require('dotenv').config();

class ServicioPg {
    
    constructor(db_config){
        this.pool = new Pool(db_config);
    }

// Ejecuta la clase y el metodo se debe hacer
// de forma asincrona para que respuesta tenga un valor
  
async ejecutarSQL(sql,params) {
    let response = await this.pool.query(sql,params);
    return response;
  }
}


module.exports = ServicioPg;