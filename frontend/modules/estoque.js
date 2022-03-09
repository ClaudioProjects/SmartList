const estoqueBox = document.querySelector('.estoqueBox')
import axios from 'axios'

if (estoqueBox) {
    const modal = document.querySelectorAll('.modal');
    const mainHome = document.querySelector('.mainHome');
    document.addEventListener('click', (e) => {
        const el = e.target;
        if(el.classList.contains('closeModal')) {
            for (let i of document.querySelectorAll('.error-text')) i.remove()
            if (!modal[0].classList.contains('displayNone')) {
                modal[0].classList.toggle('displayNone')
                document.querySelector('.openModal').classList.toggle('displayNone');
            } else if (!modal[1].classList.contains('displayNone')) modal[1].classList.toggle('displayNone');
        }

        if(el.classList.contains('openModal')) {
            for (let i of document.querySelectorAll('.error-text')) i.remove()
            modal[0].classList.toggle('displayNone');
            if (!modal[1].classList.contains('displayNone')) modal[1].classList.toggle('displayNone');
            mainHome.classList.toggle('opacityDark');
            el.classList.toggle('displayNone');
        };

        if(el.classList.contains('editEstoque')) {
            for (let i of document.querySelectorAll('.error-text')) i.remove()
            const id = el.parentNode.querySelector('.idProduct').value
            const load = new LoadValues(modal[1].querySelector('.estoqueForm'), `${id}`)
            load.setValue()
            modal[1].querySelector('.estoqueForm').setAttribute('action', `/estoque/edit/${id}`)
            modal[1].classList.toggle('displayNone');
            if (!modal[0].classList.contains('displayNone')) modal[0].classList.toggle('displayNone');
        }
    });

    async function total() {
        const value = await axios.get('/estoque/total')
        const formatNum = parseFloat(value.data)
        document.querySelector('.total').innerText = `Total: R$ ${formatNum.toFixed(2)}`
    }

    total()
  
    class LoadValues {
        constructor(form, id) {
            this.form = form;
            this.id = id;
        }

        async getValue(){
            this.values = await axios.get(`/estoque/push/${this.id}`)
            this.formatValue = this.values.data
        }

        async setValue(){
            await this.getValue()
            this.inputs = this.form.querySelectorAll('input');
            for (let i of this.inputs) {
                if(i.classList.contains('name')) i.value = this.formatValue.name
                if(i.classList.contains('code')) i.value = this.formatValue.code
                if(i.classList.contains('unity')) i.value = this.formatValue.unity
                if(i.classList.contains('value')) i.value = this.formatValue.value.toFixed(2)
            };
        };
    };

    class Valida {
        constructor (form) {
            this.form = form;
            this.error = [];
            this.cleanError()
            this.events()
        };

        events() {
            this.form.addEventListener('submit', e => {
                this.handleSubmit(e);
            });
        };
        
        handleSubmit(e){
            e.preventDefault();
            this.empty();
            if (this.error.length === 0) this.form.submit();
            this.error = []
        };

        empty(){
            this.cleanError()
            this.inputs = this.form.querySelectorAll('.check');
            for (let i of this.inputs) {
                if(i.value.length === 0) {
                    this.criaErro(i, 'Este campo precisa ser preenchido');
                    this.error.push('error');
                }
                if(i.value.length > 40) {
                    this.criaErro(i, 'Este campo não pode ser muito Longo');
                    this.error.push('error');
                };
                if(i.classList.contains('value')) {
                    if (!i.value.match(/^[0-9.,/]+$/g)) {
                        this.criaErro(i, 'Precisa ser um valor real');
                        this.error.push('error');
                        return
                    }
                    let format = this.formatNum(i.value)
                    if (!format) {
                        this.criaErro(i, 'Precisa ser um valor real')
                        this.error.push('error');
                        console.log(format) 
                    } else i.value = format
                }
            };
        };

        formatNum(value){
            value = value.replace(',', '.')
            try {
                let num = Number
                num = parseFloat(value).toFixed(2)
                return num
            } catch (e) {
                console.log(e)
                return
            }
        }

        criaErro(campo, msg){
            campo = campo.parentNode;
            const div = document.createElement('div');
            div.innerText = msg;
            div.classList.add('error-text');
            campo.appendChild(div);
        };
        cleanError(){
            for (let i of this.form.querySelectorAll('.error-text')) i.remove();
        }
    };

    const instace = new Valida(modal[0].querySelector('.estoqueForm'));
    const instace2 = new Valida(modal[1].querySelector('.estoqueForm'));
};
