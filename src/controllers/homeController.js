exports.index = (req, res) => {
    res.render('home',
    {contato: {}})
}

exports.createList = (req, res) => {
    res.render('createList')
}