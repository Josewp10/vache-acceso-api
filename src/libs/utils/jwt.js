const {sign, verify, decode} = require('jsonwebtoken');
const config = require('config');
const secret_key = config.get('SECRET_KEY');

class Jsonwebtoken{

    generateToken(user){
        return sign(user, secret_key, { expiresIn: "1h" });
    };
    
    decodeToken(token){
        return decode(token, secret_key);
    };
    
    validateToken(token){
        
        try {
            return verify(token, secret_key);   
        } catch (error) {
            console.log(error);
        }
    };
}

module.exports={Jsonwebtoken}