module.exports = {
    getHomePage: (req, res) => {
        var message = '';
        res.render('index.ejs',{message: message});
    },
};