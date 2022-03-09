const List = require('../models/ListModel');

exports.create = async (req, res) => {
    try {
        const list = new List(req.body, req.session.user._id);
        await list.create(); 
        
        req.session.save(function () {
            return res.redirect(`/lists/${list.user._id}`);
        });
    } catch (e) {
        console.log(e);
        res.render('404');
    };
};

exports.lists = async (req, res) => {
    try {
        const list = new List(req.body, req.session.user._id); 
        const listas = await list.buscaLista(req.params.id)
        res.render('myLists', {
            listas: listas,
        }) 
    } catch(e) {
        console.log(e);
        res.render('404');
    }
}

exports.openList = async (req, res) => {
    try {
        const list = new List(req.body, req.session.user._id)
        const filterList = await list.open(req.session.user._id, req.params.name)
        res.render('openList', {
            lista: filterList,
        })
    } catch (e) {
        console.log(e)
        res.render('404')
    }
}

exports.edit = async (req, res) => {
    try {
        const list = new List(req.body, req.session.user._id);
        await list.deleteList(req.session.user._id, req.params.name);
        await list.create();
        req.session.save(function () {
            return res.redirect(`/lists/${req.session.user._id}`);
        });
    } catch(e) {
        console.log(e)
        res.render('404')
    }   
}

exports.delete = async(req, res) => {
    try {
        const list = new List(req.body, req.session.user._id)
        await list.deleteList(req.session.user._id, req.params.name)
        req.session.save(function () {
            return res.redirect(`/lists/${req.session.user._id}`)
        });
    } catch(e) {
        console.log(e)
        res.render('404')
    } 
}