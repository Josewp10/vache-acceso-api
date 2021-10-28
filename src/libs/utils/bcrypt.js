const bcrypt =require('bcrypt');

class Bcrypt{
    async generatePW(password){   
        let salt = await bcrypt.genSalt(10);
        let hashPW = await bcrypt.hash(password, salt);
        return hashPW;
    }

    async validatePW(password, dbPassword){
        let ok_pwd = await bcrypt.compare(password, dbPassword);
        return ok_pwd;
    }
}

module.exports={Bcrypt}