const {UsuariosController} = require('../../usuarios/controller/usuarios');
const _usuariosController = new UsuariosController;



const {Bcrypt} = require('../../utils/bcrypt');
const _bcrypt = new Bcrypt;

const {Jsonwebtoken} = require('../../utils/jwt');
const _jwt = new Jsonwebtoken;

class LoginController{

    validarUsuario(usuario){
        if (!usuario) {
            throw 'Ingrese la información del usuario';
        }else if(!usuario.correo){
            throw 'Ingrese el correo';
        }else if(!usuario.contrasena){
            throw 'Ingrese la contraseña';
        }
    };

    /**
     * @description Valida la contraseña de un usuario.
     * @param {String} contrasena 
     * @param {String} db_contrasena 
     * @returns validate
     */
    async validatePassword(contrasena, db_contrasena){
        let validate =await _bcrypt.validatePW(contrasena, db_contrasena);
        return validate;
    }

    /**
     * Generates the user access token
     * @param {boolean} ok 
     * @param {Object} usuario 
     * @returns 
     */
    genToken(ok, usuario){
        delete usuario.correo;
        delete usuario.contrasena;

        if(ok){
            let token = _jwt.generateToken(usuario);
            return token;
        }else{
            throw 'Not Authorized';
        }        
    }

    /**
     * @description Orchestrates the entire login process based on a provided user.
     * @param {Object} usuario 
     */
    async processLogin(usuario){
    
        let ok_user, token;
        this.validarUsuario(usuario);
        let user= await _usuariosController.consultarUsuario(usuario.correo);
        ok_user = await this.validatePassword(usuario.contrasena, user.contrasena);

        token = this.genToken(ok_user, user);
        return token; 
                 
    }
}

module.exports=LoginController;