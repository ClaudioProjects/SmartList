const mongoose = require('mongoose');
// Trabalho do model é trabalhar com dados
const HomeSchema = new mongoose.Schema({
    titulo: {type: String, required: true},
    description: String
});

const HomeModel = mongoose.model('Home', HomeSchema);

class Home {
    
}

module.exports = Home