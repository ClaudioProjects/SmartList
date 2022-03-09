const formCreate = document.querySelector('.formList');

if(formCreate) {
    const taskCreate = document.querySelector('.taskCreate');
    const addTask = document.querySelector('.addInput');
    const form = document.querySelector('.box');

    let cloneOriginal = taskCreate.cloneNode(true);

    let num = 0;

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
            let clone = cloneOriginal.cloneNode(true);
            let btnClose = document.createElement('button');
            
            btnClose.classList.add('btnClose');
            btnClose.setAttribute('type', 'button')
            clone.appendChild(btnClose);

            const instace = new EditName(clone);
            instace.editAttribute();
            form.appendChild(clone);
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
            this.labelCheck = this.element.querySelector('.checkTaskBox')
                .setAttribute('for', this.criaNome('check'));

            this.idCheck = this.element.querySelector('.checkTask')
                .setAttribute('id', this.criaNome('check'));

            this.hidden = this.element.querySelector('.hidden')
                .setAttribute('name', this.criaNome('check'));

            this.nameTask = this.element.querySelector('#task')
                .setAttribute('name', this.criaNome('task'));

            this.nameTime = this.element.querySelector('#time')
                .setAttribute('name', this.criaNome('time'));

            this.nameRatio = this.element.querySelectorAll('.type')
            for (let i of this.nameRatio) i.setAttribute('name', this.criaNome('type'));  
            num++;
        };

        criaNome(string) {
            return string + num;
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
            console.log(this.valid)
            if(!this.valid) return;
            this.form.submit();
        };

        checkLength() {
            for (let errorText of this.form.querySelectorAll('.error-text')){
                errorText.remove()
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
                box.classList.toggle('grey');
                box.querySelector('.checkTaskBox').classList.toggle('checked');
            };  
        };
    };

};
