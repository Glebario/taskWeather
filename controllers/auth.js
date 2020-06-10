const User = require('../models/user')
const bcrypt = require('bcrypt-nodejs')
const jwt = require('jsonwebtoken')
const {validationResult} = require('express-validator')
const error = require('../utils/error')
const keys = require('../config/keys')

module.exports.login = async function(req, res) {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некорректные данные при регистрации'
            })
        }

        const candidate = await User.findOne({email: req.body.email})

        if (candidate) {
            const result = bcrypt.compareSync(req.body.password, candidate.password)
            if (result) {
                const userResponse = {
                    localId: candidate._id,
                    profile: candidate.profile
                }
                const token = jwt.sign({
                    email: candidate.email,
                    userId: candidate._id
                }, keys.jwt, {expiresIn: 60 * 60})
                res.status(200).json({
                    token: `Bearer ${token}`,
                    userResponse
                })
            } else {
                res.status(401).json({message: 'Пароль неверный'})
            }
        } else {
            res.status(404).json({message: 'Пользователь не найден'})
        }
    } catch(e) {
        error(res, e)
    }
}






module.exports.register = async function(req, res) {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некорректные данные при регистрации'
            })
        }


        const emailCandidate = await User.findOne({email: req.body.email})
        if (emailCandidate) {
            res.status(409).json({message: 'Такой email уже занят'})
        } else {
            const salt = bcrypt.genSaltSync(10)
            const userDb = new User({
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, salt),
                profile: req.body.profile
            })

            await userDb.save()
            const userResponse = {
                localId: userDb._id,
                profile: userDb.profile
            }
            res.status(201).json( userResponse )
        }
    } catch(e) {
        error(res, e)
    }
}
