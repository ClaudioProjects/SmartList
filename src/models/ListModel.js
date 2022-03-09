const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema({
    check: {type: String, default: 'false'},
    nameList: {type: String, required: true, trim: true},
    task: {type: String, required: true, trim: true, default: ''},
    time: {type: String},
    type: {type: String},
    date: {type: Date, default: Date.now}
});

class List {
    constructor(body, name){
        this.body = body;
        this.list = [];
        this.list2 = [];
        this.name = name;
    };

    async create() {
        const ListModel = mongoose.model(this.name, ListSchema);
        this.list = Object.values(this.body);
        this.nameList = this.list[1];
        this.createModel(2)
        while (this.list.length > 0) {
            this.check();
            if(this.valid) this.body.date = new Date(this.date);
            this.user = await ListModel.create(this.body);
            this.createModel(4);
        };
    };

    createModel(num) {
        this.list = this.list.slice(num);
        this.body.nameList = this.nameList;
        this.body.task = this.list[1];
        this.body.time = this.list[2];
        this.body.type = this.list[3];
        this.body.check = this.list[0];
    };

    check() {
        for(let key in this.body){
            if(typeof this.body[key] !== 'string'){
                this.body[key] = '';
            };
        };
    };

    async open(id ,name) {
        await this.buscaLista(id)
        let filterList = []
        for (let i of this.lista) if (i.nameList === name) filterList.push(i)
        return filterList 
    }

    async buscaLista(id) {
        this.id = id
        const ListModel = mongoose.model(this.name, ListSchema);
        this.lista = await ListModel.find({id: id})
            .sort( {date: 1});
        return Object.values(this.lista);
    };

    async deleteList(id, name) {
        const ListModel = mongoose.model(this.name, ListSchema);
        const del = await this.open(id, name);
        let idDel = this.findId(del)
        for (let i of idDel) await ListModel.findByIdAndDelete({_id: i})
        const date = new Date(del[0].date)
        this.date = date.toISOString()
        this.valid = true
    }

    findId(value){
        const id = []
        for (let i of value) if(!id.includes(i._id)) id.push(i._id)
        return id
    }

};

module.exports = List;