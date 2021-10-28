const config = require('config');
const DB = config.get('DB');

const ServicioPG = require('../../../database/postgress');
const _servicio = new ServicioPG(DB);

class UsuariosDAO{

    async consultarUsuario(correo){
        let sql = `SELECT id, correo, contrasena, rol
        FROM public."Usuarios"
        WHERE correo=$1;`;
        let resp = await _servicio.ejecutarSQL(sql, [correo]);
        return resp;
    }

    async crearUsuario(usuario){
        let sql = `INSERT INTO public."Usuarios"(correo, contrasena, rol)
            VALUES ($1, $2, $3);`;
        let values = [usuario.correo, usuario.contrasena, usuario.rol]
        await _servicio.ejecutarSQL(sql, values);
    }
}

module.exports={UsuariosDAO}