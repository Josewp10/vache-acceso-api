const {UsuariosController} = require('../../usuarios/controller/usuarios');
const _usersController = new UsuariosController;


class SignUpController{

    /**
     * @description Orquesta el proceso de registro de un usuario.
     * @param {Object} usuario 
     */
    async processSignUp(usuario){
        await _usersController.crearUsuario(usuario);
    }

}

module.exports=SignUpController;