const { response } = require('express');
const Users = require('../models/user');

const getAll = async(req, res = response) => {


    const { page = 1, limit = 20 } = req.query;
    if (page < 1 || limit < 20) {
        return res.status(400).json({
            ok: false,
            msg: 'Parametros inválidos'
        });
    }

    try {
        const users = await Users.find().limit(limit).skip((page - 1) * limit).exec();
        const count = await Users.countDocuments();

        res.json({
            ok: true,
            users,
            count
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error interno'
        });
    }


};

const get = async(req, res = response) => {
    const uid = req.params.id;

    try {
        const user = await Users.findById(uid);
        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'Parametros inválidos'
            });
        }
        res.json({
            ok: true,
            user
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Parametros inválidos'
        });
    }

};

const create = async(req, res = response) => {
    const { email, dni } = req.body;

    try {

        const emailExist = await Users.findOne({ $or: [{ email }, { dni }] });

        if (emailExist) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo o el dni ya existe'
            });
        }

        // Guardar usuario

        const user = new Users(req.body);

        await user.save();

        res.json({
            ok: true,
            user
        });


    } catch (error) {
        res.status(501).json({
            ok: false,
            msg: 'Error al crear usuario'
        });
    }
};

const update = async(req, res = response) => {
    const uid = req.params.id;

    try {
        const userDB = await Users.findById(uid);

        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no encontrado'
            });
        }

        const { nombre, dni, celular, email } = req.body;
        if (userDB.email != email) {
            const existEmail = await Users.findOne({ $or: [{ email }, { dni }] });
            if (existEmail) {
                res.status(400).json({
                    ok: false,
                    msg: 'El correo o el dni ya existe'
                });
            }
        }
        const userUpdate = await Users.findByIdAndUpdate(uid, { nombre, dni, celular, email }, { new: true });

        res.json({
            ok: true,
            user: userUpdate
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
};

const remove = async(req, res = response) => {
    const uid = req.params.id;

    try {
        const userDB = await Users.findById(uid);

        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no encontrado'
            });
        }
        await Users.findByIdAndDelete(uid);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado !!! ver logs'
        });
    }
};

module.exports = {
    get,
    getAll,
    create,
    update,
    remove
};