const { Schema, model } = require('mongoose');

const UsersSchema = Schema({
    nombre: {
        type: String,
        require: true
    },
    dni: {
        type: Number,
        require: true
    },
    celular: {
        type: Number,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    }
});

UsersSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model('Users', UsersSchema);