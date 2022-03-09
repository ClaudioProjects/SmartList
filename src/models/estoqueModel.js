const mongoose = require('mongoose');

const EstoqueSchema = new mongoose.Schema({
    type: {type: String, default:'Estoque'},
    name: {type: String, required: true},
    code: {type: String, required: true},
    unity: {type: String, required: true, default: '1'},
    value: {type: Number,  required: true, default: '0'},
    date: {type: Date, default: Date.now}
});

class Estoque {
    constructor(body, name){
        this.body = body;
        this.name = name;
    };

    async create() {
        const EstoqueModel = mongoose.model(`${this.name}E`, EstoqueSchema);
        this.user = await EstoqueModel.create(this.body);
    };

    check() {
        for(let key in this.body){
            if(typeof this.body[key] !== 'string'){
                this.body[key] = '';
            };
        };
    };

    async buscaEstoque(id) {
        this.id = id
        const EstoqueModel = mongoose.model(`${this.name}es`, EstoqueSchema);
        this.estoque = await EstoqueModel.find({id: id})
        return Object.values(this.estoque);
    };

    async delete(id) {
        const EstoqueModel = mongoose.model(`${this.name}es`, EstoqueSchema);
        await EstoqueModel.findByIdAndDelete({_id: id})
    }

    async find(id) {
        const EstoqueModel = mongoose.model(`${this.name}es`, EstoqueSchema);
        const dados = await EstoqueModel.findById({_id: id})
        return dados    
    }
    async saveEdit(id) {
        const EstoqueModel = mongoose.model(`${this.name}es`, EstoqueSchema);
        await EstoqueModel.findByIdAndUpdate(id, this.body, { new: true });
    }

    async total() {
        const EstoqueModel = mongoose.model(`${this.name}es`, EstoqueSchema);
        this.products = await EstoqueModel.find({id: `${this.name}es`})
        const total = this.sumValues(this.products)
        return total.toString()
    }

    sumValues(produtos) {
        let sum = 0
        for (let i of produtos) {
            i.unity = parseFloat(i.unity)
            sum += (i.unity * i.value)
        }
        return sum
    }
};

module.exports = Estoque;
