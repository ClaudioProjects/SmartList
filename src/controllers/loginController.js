const Login = require('../models/LoginModel') 

exports.index = (req, res) => {
    res.render('login');
};

exports.register = async (req, res) => {
    try {
        const login = new Login(req.body);
        await login.resgister();

        if (login.error.length > 0) {
            req.flash('error', login.error);
            req.session.save(function(){
                return res.redirect('back');
            });
            return;
        }
        req.session.save(function () {
            return res.redirect('back');
        });
    } catch(e) {
        console.log(e);
        res.render('404');
    };
};

exports.login = async(req, res) => {
    try {
        const login = new Login(req.body);
        await login.login();

        if (login.error.length > 0) {
            req.flash('error', login.error);
            req.session.save(function(){
                return res.redirect('/')
            });
            return;
        };
        req.session.user = login.user
        req.session.save(function () {
            return res.redirect('/home');
        });
    } catch(e) {
        console.log(e);
        res.render('404');
    };
};

exports.logout = function(req, res) {
    req.session.destroy();
    res.redirect('/')
}
