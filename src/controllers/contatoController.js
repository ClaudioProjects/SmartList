exports.index = (req, res) => {
    try {
        res.render('contato');
    } catch (e) {
        console.log(e);
        res.render('404');
    };
};