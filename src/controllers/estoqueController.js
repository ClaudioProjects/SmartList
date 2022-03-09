const Estoque = require('../models/estoqueModel')

exports.index = async (req, res) => {
    try {
        const instace = new Estoque(req.body, req.session.user._id)
        const user = await instace.buscaEstoque(req.session.user._id)
        res.render('estoque', {
            estoque: user,
        })

    } catch (e) {
        console.log(e)
        res.render('404')
    }
};

exports.create = async (req, res) => {
    try {
        const instace = new Estoque(req.body, req.session.user._id)
        await instace.create();
        req.session.save(function () {
            return res.redirect('/estoque')
        })
    } catch(e) {
        console.log(e);
        res.render('404');
    };
};

exports.delete = async (req, res) => {
    try {
        const instace = new Estoque(req.body, req.session.user._id)
        await instace.delete(req.params.id);
        
        req.session.save(function () {
            return res.redirect('/estoque')
        })
    } catch(e) {
        console.log(e);
        res.render('404');
    }
}

exports.loadEdit = async (req, res) => {
    try {
        const instace = new Estoque(req.body, req.session.user._id)
        const dados = await instace.find(req.params.id); 
        res.send(dados)
    } catch(e) {
        console.log(e)
        res.render('404')
    }
}

exports.saveEdit = async (req, res) => {
    try {
        const instace = new Estoque(req.body, req.session.user._id)
        await instace.saveEdit(req.params.id);
        req.session.save(function () {
            return res.redirect('/estoque')
        })
    } catch (e) {
        console.log(e);
        res.render('404');
    }
}

exports.total = async (req, res) => {
    try {
        const instace = new Estoque(req.body, req.session.user._id)
        const dados = await instace.total()
        res.send(dados)
    } catch (e){
        console.log(e)
        res.render('404')
    }
}