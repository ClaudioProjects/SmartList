const mongoose = require('mongoose');
const validator = require('validator');

const LoginSchema = new mongoose.Schema({
    name: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
});

const LoginModel = mongoose.model('Login', LoginSchema);
const bcryptjs = require('bcryptjs');

class Login {
    constructor(body){
        this.body = body;
        this.error = [];
        this.user = null;
    };

    async resgister () {
        this.valida();
        if (this.error.length > 0) return;

        const salt = bcryptjs.genSaltSync();
        this.body.password = bcryptjs.hashSync(this.body.password, salt);

        this.user = await LoginModel.create(this.body);
    };

    async login () {
        this.cleanUp()

        this.user = await LoginModel.findOne({email: this.body.email});

        if(!this.user){
            this.error.push('Email ou senha incorreto');
            return
        };


        if (!bcryptjs.compareSync(this.body.password, this.user.password)){
            this.error.push('Email ou senha incorreto')
            this.user = null;
            return;
        };
    };

    valida(){
        this.cleanUp
        if (!this.body.name.match(/^[a-zA-Z /]+$/g)) {
            this.error.push(`Nome só pode conter letras`);
        };
        if (!this.body.lastName.match(/^[a-zA-Z /]+$/g)) {
            this.error.push(`Sobrenome só pode conter letras`);
        };
        if (!validator.isEmail(this.body.email)) {
            this.error.push(`Email invalido`);
        };
        if (this.body.password !== this.body.passwordConfirm) {
            this.error.push(`A senhas devem estar iguais`);
        };
    };

    cleanUp(){
        for(let key in this.body){
            if(typeof this.body[key] !== 'string'){
                this.body[key] = '';
            };
        }
        this.body = {
            name: this.body.name,
            lastName: this.body.lastName,
            email: this.body.email,
            password: this.body.password,
            passwordConfirm: this.body.passwordConfirm
        };
    };
}

module.exports = Login