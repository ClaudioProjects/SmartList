exports.middlewareMain = (req, res, next) => {
    res.locals.error = req.flash('error');
    res.locals.nameList = req.params
    next();
};

exports.checkCsrfError = (err, req, res, next) => {
    if (err) {
        console.log(err);
        return res.render('404');  
    };
};

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
};

exports.loginRequired = (req, res, next) => {
    if (!req.session.user) {
        req.flash('error', 'Você precisa estar logado');
        req.session.save(() => res.redirect('/'));
        return;
    };
    next();
};

exports.varGlobal = (req, res, next) => {
    res.locals.user = req.session.user;
    res.locals.id = req.session.name;
    res.locals.name = req.session.user.name;
    next()
}