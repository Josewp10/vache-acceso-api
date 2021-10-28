
const {UsuariosDAO} = require("../DAO/usuarios");
const _usuariosDao = new UsuariosDAO;

const {Bcrypt} = require('../../utils/bcrypt');
const _bcrypt = new Bcrypt;

class UsuariosController {

    /**
   * @description
   * @param {Object} usuario 
   */
    validarUsuario(usuario){
        if (!usuario) {
            throw 'Ingrese la información del usuario';
        }else if(!usuario.correo){
            throw 'Ingrese el correo';
        }else if(!usuario.contrasena){
            throw 'Ingrese la contraseña';
        }else if(!usuario.rol){
            throw 'Ingrese el ro';
        }
    };

    async consultarUsuario(correo){
        let answerDB = await _usuariosDao.consultarUsuario(correo);
        return answerDB.rows[0];
    }

    async crearUsuario(usuario){
        this.validarUsuario(usuario);
        console.log(usuario.contrasena);
        let newPW = await _bcrypt.generatePW(usuario.contrasena);
        usuario.contrasena=newPW;
        await _usuariosDao.crearUsuario(usuario);
    }
}

module.exports={UsuariosController}