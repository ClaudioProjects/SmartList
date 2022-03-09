const { hidePoweredBy } = require("helmet");

const formCreate = document.querySelector('.formEdit');

if(formCreate) {
    const taskCreate = document.querySelectorAll('.taskCreate');
    const addTask = document.querySelector('.addInput');
    const form = document.querySelector('.box');

    document.addEventListener('click', (e) => {
        const elem = e.target
        if (elem.classList.contains('checkTaskBox')){
            const hidden = elem.parentNode.querySelector('.hidden')
            const checkbox = elem.parentNode.querySelector('.checkTask')
            !checkbox.checked? hidden.value = 'true' : hidden.value = 'false'
            const check = new FormatInput() 
            check.checkTask(elem.parentNode)
        }
        if (elem === addTask) {
            const clone = taskCreate[0].cloneNode(true)
            const instace = new EditName(clone);
            const check = new FormatInput() 
            check.boxClean(clone)
            instace.editAttribute();
        };

        if (elem.classList.contains('btnClose')) elem.parentNode.remove();

    });

    document.addEventListener('change', (e) => {
        const elem = e.target;
        if (elem.classList.contains('type')) {
            if(elem.checked){
                const main = elem.parentNode.parentNode.parentNode;
                cleanClass(main);
                main.classList.add(elem.value);
            };
        };
    });

    formCreate.addEventListener('submit', (e) => {
        e.preventDefault();
        const valida = new ValidateTask('.formCreate');
        valida.check();
    });

    function cleanClass(value) {
        const classType = ['estudos', 'tarefas', 'lazer'];
            for (let i of classType) {
                if(value.classList.contains(i)) value.classList.remove(i);
            };
    };

    class EditName {
        constructor (element) {
            this.element = element;
        };


        editAttribute() {
            this.num = form.querySelectorAll('.taskCreate').length + 1;
            this.labelCheck = this.element.querySelector('.checkTaskBox')
                .setAttribute('for', `check${this.num}`);

            this.idCheck = this.element.querySelector('.checkTask')
                .setAttribute('id', `check${this.num}`);

            this.hidden = this.element.querySelector('.hidden')
                .setAttribute('name', `check${this.num}`);

            this.nameTask = this.element.querySelector('#task')
                .setAttribute('name', `task${this.num}`);

            this.nameTime = this.element.querySelector('#time')
                .setAttribute('name', `time${this.num}`);

            this.checkBox = this.element.querySelector('.checkTask')
                .removeAttribute('checked')
                
            this.nameRatio = this.element.querySelectorAll('.type')
            for (let i of this.nameRatio) i.setAttribute('name', `type${this.num}`);
            form.appendChild(this.element)  
        };

    };

    class ValidateTask {
        constructor(form) {
            this.form = document.querySelector(form);
            this.inputs = this.form.querySelectorAll('input');
            this.error = [];
            this.valid = true;
        };

        check() {
            this.checkLength();
            if(!this.valid) return;
            this.form.submit();
        };

        checkLength() {
            for (let errorText of this.form.querySelectorAll('.error-text')){
                errorText.remove()
            }
            if(document.querySelectorAll('.taskCreate').length < 1){
                this.error.push('A lista precisa ter no minimo uma tarefa')
                this.addErro(this.form.querySelector('.textInput'))
                this.valid = false
            }
            for (let i of this.inputs) {
                if (i.classList.contains('textInput')) {
                    if(i.value.length === 0){
                        this.error.push('Valores vazios não podem ser enviados');
                        this.addErro(i);
                        this.valid = false;
                    };
                };
            };
        };

        addErro(input) {
            const div = document.createElement('div');
            div.innerText = this.error[0];
            div.classList.add('error-text');
            input.insertAdjacentElement('afterend', div);
        };
    };

    class FormatInput {
        checkTask (box) {
            const hidden = box.querySelector('.hidden')
            if(hidden.value === 'true') {
                box.querySelector('.checkTask').checked
                box.classList.toggle('grey');
                box.querySelector('.checkTaskBox').classList.toggle('checked');
            } else {
                box.classList.remove('grey');
                box.querySelector('.checkTaskBox').classList.remove('checked');
            };
        };

        boxClean(box) {
            const inputs = box.querySelectorAll('input')
            for (let i of inputs) {
                if (i.classList.contains('hidden')) {
                    i.value = 'false'
                } else if (!i.classList.contains('type')) i.value = ''
                this.checkTask(box)
            };
            cleanClass(box)
            const type = box.querySelectorAll('.type')
            for (let i of type) i.removeAttribute('checked')
            box.querySelector('.estudos').setAttribute('checked', '')
            box.classList.add('estudos')
        }

        selectType(box) {
            const checkBox = box.querySelector('.checkTask')
            if(box.classList.contains('estudos')) box.querySelector('.estudos')
                .setAttribute('checked', '');
            if(box.classList.contains('tarefas')) box.querySelector('.tarefas')
                .setAttribute('checked', '');
            if(box.classList.contains('lazer')) box.querySelector('.lazer')
                .setAttribute('checked', '');
            if(box.querySelector('.hidden').value === 'true') checkBox
                .setAttribute('checked', ''); 
        } 
    };

    const checkBox = new FormatInput()
    for (let i of taskCreate){
        checkBox.checkTask(i) 
        checkBox.selectType(i)
    };

};
