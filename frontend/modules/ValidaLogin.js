const mainBoxLogin = document.querySelector('.containerLogin');

if (mainBoxLogin) {
    const register = document.querySelector('.mainFormRegister');
    const login = document.querySelector('.mainFormLogin');
    const toLogin = document.querySelector('.toLogin');
    const toRegister = document.querySelector('.toRegister');
    const registerBox = document.querySelector('.mainFormRegister')
    const titleBottom = document.querySelector('.titleBottom')
    const mainBoxLogin = document.querySelector('.containerLogin');
    
    toLogin.addEventListener('click', () => {
        register.style.display = 'none';
        login.style.display = 'block';
        mainBoxLogin.style.alignItems = 'center'
        titleBottom.style.marginBottom = '11rem'
    });
    
    toRegister.addEventListener('click', () => {
        login.style.display = 'none';
        register.style.display = 'block'
        mainBoxLogin.style.alignItems = 'flex-start'
        registerBox.style.marginTop = '10rem'
        titleBottom.style.marginTop = '8rem' 
    });
}

const validator = require('validator')
export default class ValidaForm {
    constructor(value) {
        this.formulario = document.querySelector(`${value}`)
        this.eventos();
    }
    
    eventos() {
        this.formulario.addEventListener('submit', e => {
            this.handleSubmit(e);
        })
    }

    handleSubmit(e){
        e.preventDefault();
        const isValidC = this.isValid();
        const validaSenha = this.validPassword();
        if(isValidC && validaSenha) {
            this.formulario.submit()
        }
    };

    criaErro(campo, msg){
        const div = document.createElement('div');
        div.innerText = msg;
        div.classList.add('error-text');
        campo.insertAdjacentElement('afterend', div)
    }

    isValid(){
        for (let errorText of this.formulario.querySelectorAll('.error-text')){
            errorText.remove()
        }
        // Revisar
        let valid = true;
        for (let campos of this.formulario.querySelectorAll('.check')) {
            const placeholder = campos.placeholder;
            if(!campos.value) {
                this.criaErro(campos, `O campo "${placeholder.toUpperCase()}" não pode conter espaços vazios`);
                valid = false;
            }
            if (campos.classList.contains('name')){
                if (!this.checkLength(campos)) {
                    this.criaErro(campos, `O campo "${placeholder.toUpperCase()} deve tem entre 2 a 20 caracteres"`)
                    valid = false
                }
                if (!this.checkName(campos)) {
                    this.criaErro(campos, `O campo "${placeholder.toUpperCase()}" só pode conter letras`)
                }
            }

            if (campos.classList.contains('lastName')){
                if (!this.checkLength(campos, 50)) {
                    this.criaErro(campos, `O campo "${placeholder.toUpperCase()} deve tem entre 2 a 50 caracteres"`)
                    valid = false
                }
            }

            if (campos.classList.contains('email')){
                if (!validator.isEmail(campos.value)) {
                    this.criaErro(campos, `O campo "${placeholder.toUpperCase()} precisa se valido"`)
                }
            }
        }
        return valid

    }

    checkLength(campo, max=20, min=2) {
        if (!(campo.value.length <= max || campo.value.length >= min)) {
            return false
        }

        return true
    }

    checkName(campo) {
        const user = campo.value
        if (!user.match(/^[a-zA-Z /]+$/g)) {
            return false
        }

        return true
    }

    validPassword() {
        if (this.formulario.classList.contains('registerSubmit')) {
            let valid = true
            const password = this.formulario.querySelector('.password');
            const passwordConfirm = this.formulario.querySelector('.passwordConfirm');
    
            if (password.value !== passwordConfirm.value) {
                valid = false
                this.criaErro(password, 'As senhas precisam ser iguais');
                this.criaErro(passwordConfirm, 'As senhas precisam ser iguais')
            }
            return valid 
        }
        return true
    }
}
