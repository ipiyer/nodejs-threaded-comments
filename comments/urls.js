var views = require('./views.js');

module.exports = function(app){
    app.post(/\/comment/, views.comment);
    app.get(/\/comments/, views.getComments);
};
